from datetime import date, datetime, timedelta
from unittest import result
import mysql.connector
import bcrypt
import jwt
from flask import current_app

from .jobboard_exeception import DatabasesInsertError,DatabasesConnexionError, DatabasesUpdateError, DatabasesRemoveError, DatabasesApplyError, UserAlreadyIn, LoginError

class Manager:

    def sql_connexion(self):
        """Parameter for mysql connexion

        Returns:
            json: return parameter
        """
        connection_params = {
            'host': "localhost",
            'user': "root",
            'password': "1234",
            'database': "jobboard",
        }
        return connection_params
    
    def get_jobAdmin(self):
        """Get all Job into database

        Raises:
            DatabasesInsertError: trigger when there is a databases Error

        Returns:
            tab[json]: Return All jobs in databases
        """
        param = self.sql_connexion()

        request = "select * from advertising;"
        jobs = []
        try:
            with mysql.connector.connect(**param) as db:
                with db.cursor() as c:
                    c.execute(request)
                    resultats = c.fetchall()
                    for job in resultats:
                        jobs.append(
                            {'id': job[0], 'title':job[1], 'compagnies':job[2], 'city':job[3],
                                        'type':job[4], 'date':job[5].strftime("%Y-%m-%d"), 'description':job[6], 'salary':str(job[7])}
                        )
        except:
            raise DatabasesInsertError(f"Insert job error")
        return jobs
    def get_job(self):
        """Get all Job into database

        Raises:
            DatabasesInsertError: trigger when there is a databases Error

        Returns:
            tab[json]: Return All jobs in databases
        """
        param = self.sql_connexion()

        request = "select * from advertising;"
        jobs = []
        try:
            with mysql.connector.connect(**param) as db:
                with db.cursor() as c:
                    c.execute(request)
                    resultats = c.fetchall()
                    for job in resultats:
                        jobs.append(
                            {'id': job[0], 'title':job[1], 'compagnies':job[2], 'city':job[3],
                                        'type':job[4], 'date':job[5].strftime("%Y-%m-%d")}
                        )
        except:
            raise DatabasesInsertError(f"Insert job error")
        return jobs

    def get_jobAll(self, id):
        """Get details of a job given

        Args:
            id (int): id of a job

        Raises:
            DatabasesInsertError: trigger when there is a databases Error

        Returns:
            json: return Details of a jobs
        """
        param = self.sql_connexion()

        request = "select * from advertising WHERE `advertising-id` LIKE "+str(id)+";"
        jobs = []
        try:
            with mysql.connector.connect(**param) as db:
                with db.cursor() as c:
                    c.execute(request)
                    resultats = c.fetchall()
                    for job in resultats:
                        jobs = {'id': job[0], 'title':job[1], 'compagnies':job[2], 'city':job[3],
                                        'type':job[4], 'date':job[5].strftime("%Y-%m-%d"), 'description':job[6], 'salary':str(job[7])}
                        
        except:
            raise DatabasesInsertError(f"Insert job error")
        return jobs



    def add_user(self, firstName, lastName, email, phone, passwrd, date):
        """Function to add user in databses (for register)

        Args:
            firstName (string): first name of user 
            lastName (_tystringpe_): last name of user 
            email (string): email of user 
            phone (string): phone number of user 
            passwrd (string): password (hash) of user 
            date (string): date of creation of user tion_

        Raises:
            UserAlreadyIn: raise if user is already register 
        """
        param = self.sql_connexion()

        bytepwd = passwrd.encode('utf-8')
        mySalt = bcrypt.gensalt()

        hash = bcrypt.hashpw(bytepwd, mySalt)
        
        request = "SELECT `user-email` FROM user WHERE `user-email` LIKE '" + str(email) + "';"
        with mysql.connector.connect(**param) as db:
            with db.cursor() as c:
                c.execute(request)
                results = c.fetchall()
                if (results):
                    raise UserAlreadyIn(f"User " + str(email)+ " already register please log in")
                else :
                    value = (firstName, lastName, email, phone, hash, date) 
                    request = "INSERT INTO user (`user-firstName`, `user-lastName`, `user-email`, `user-phone`, `user-password`, `user-date`, `user-type`) VALUES(%s, %s, %s, %s, %s, %s, 0);"
                    c.execute(request, value)
                    db.commit()
                    c.close()
                    db.close()

    def add_job(self, title, compagnies, city, type, date, description, salary):
        """Add a new job in the databases (for Admin only)

        Args:
            title (string): title of a job
            compagnies (string): compagnies of a job
            city (string): city of a job
            type (string): type of a job
            date (string): date of a job
            description (string): description of a job
            salary (string): salary of a job

        Raises:
            DatabasesInsertError: _description_
        """
        param = self.sql_connexion()

        value = (title, compagnies, type, city, date, description, salary) 
        request = "INSERT INTO advertising (`advertising-title`, `advertising-companies`, `advertising-city`, `advertising-type`, `advertising-date`, `advertising-description`, `advertising-salary`) VALUES(%s, %s, %s, %s, %s, %s, %s);"
        try:
            with mysql.connector.connect(**param) as db:
                with db.cursor() as c:
                    c.execute(request, value)
                    db.commit()
                    c.close()
                    db.close()
        except:
            raise DatabasesInsertError(f"Insert job error")

    def add_comp(self, data):
        """Add compagnies to the databases

        Args:
            data (Json): Data of compagnies

        Raises:
            DatabasesInsertError: raise if Databases have an error
        """
        param = self.sql_connexion()
        value = data
        request = "INSERT INTO companies (`company-name`, `company-sector`, `company-city`, `company-link`, `company-weight`, `company-turnover`) VALUES(%s, %s, %s, %s, %s, %s);"
        try:
            with mysql.connector.connect(**param) as db:
                with db.cursor() as c:
                    c.execute(request, value)
                    db.commit()
                    c.close()
                    db.close()
        except:
            raise DatabasesInsertError(f"Insert compagnies error")

    def connexion(self, email, password):
        """Conneciton function to check login 

        Args:
            email (string): email of the user
            password (string): password of the user

        Raises:
            LoginError: Raise if email address or password is wrong

        Returns:
            json: Return tokken of user and IsADmin true or false 
        """
        param = self.sql_connexion()
        isAdmin = False
        request = "SELECT `user-password` FROM `user` WHERE '" + str(email)  + "' LIKE `user-email`"
        with mysql.connector.connect(**param) as db:
            with db.cursor() as c:
                c.execute(request)
                results = c.fetchone()
                db.commit()
                c.close()
                db.close()
                if (results == None):
                    raise LoginError(f"Incorrect Email !")   
                if (bcrypt.checkpw(password.encode('utf8'), results[0].encode('utf8'))):
                    request = "SELECT `user-id`, `user-firstName`, `user-type` FROM `user` WHERE '" + str(email)  + "' LIKE `user-email`"
                    with mysql.connector.connect(**param) as db:
                        with db.cursor() as c:
                            c.execute(request)
                            results = c.fetchone()
                            db.commit()
                            c.close()
                            db.close()
                    if results[2] == 1:
                        isAdmin = True
                    token = jwt.encode({
                        'id' : results[0],
                        'user' : results[1],
                        'type' : results[2],
                        'exp' : datetime.utcnow() + timedelta(minutes=30)
                    }, current_app.config['SECRET_KEY'])
                    data = {'token' : token, 'isAdmin' : isAdmin}
                    return data
                else :
                    raise LoginError(f"Incorrect password !") 
                 

    def update(self, data):
        """fonction to update job 

        Args:
            data (Json): Data from the front for job update

        Raises:
            DatabasesUpdateError: Raise if there is a error with database
        """
        param = self.sql_connexion()
        
        if data['who'] == 0:
            sql = "UPDATE advertising SET `advertising-title` = '"+data["title"]+"', `advertising-companies`= '"+data["compagnies"]+"', `advertising-city`= '"+data["city"]+"', `advertising-type`= '"+data["type"]+"', `advertising-date`= '"+data["date"]+"', `advertising-description`= '"+data["description"]+"', `advertising-salary`= '"+data["salary"]+"' WHERE `advertising-id`= "+data["id"]+";"
        elif data['who'] == 1:
            sql = "UPDATE user SET `user-firstName` = '"+data["firstName"]+"', `user-lastName`= '"+data["lastName"]+"', `user-email`= '"+data["email"]+"', `user-phone`= '"+data["phone"]+"', `user-date`= '"+data["date"]+"' WHERE `user-id`= "+data["id"]+";"

        elif data['who'] == 2:
            sql = "UPDATE compagnies SET `compagnies-name` = '"+data["name"]+"', `compagnies-sector`= '"+data["sector"]+"', `compagnies-city`= '"+data["city"]+"', `compagnies-link`= '"+data["link"]+"' WHERE `compagnies-id`= "+data["id"]+";"

        with mysql.connector.connect(**param) as db:
            with db.cursor() as c:
                c.execute(sql)
                db.commit()
                c.close()
                db.close()
     

    def remove(self, type, id): 
        """function to remove a job

        Args:
            id (int): Id of the job 

        Raises:
            DatabasesRemoveError: Raise if there is a error with database
        """
        param = self.sql_connexion()
        
        if type == 0:
            sql = "DELETE FROM advertising WHERE `advertising-id` LIKE "+ str(id) +";"
        elif type == 1:
            sql = "DELETE FROM user WHERE `user-id` LIKE "+ str(id) +";"
        elif type == 2:
            sql = "DELETE FROM compagnies WHERE `compagnies-id` LIKE "+ str(id) +";"
        
        try: 
            with mysql.connector.connect(**param) as db:
                with db.cursor() as c:
                    c.execute(sql)
                    db.commit()
                    c.close()
                    db.close()
        except:
            raise DatabasesRemoveError(f"Remove error")

    def applyUn(self, data):
        """function Apply unconnected 

        Args:
            data (json): Data of the user when Apply

        Raises:
            DatabasesApplyError: Raise if there is a error with database
        """
        param = self.sql_connexion()
        value = (data["id"], data["first_name"], data["last_name"], data["email"], data["phone"], data["message"])
        sql = "INSERT INTO `apply-unconnected` (`un-advertising-id`, `un-first-name`, `un-last-name`, `un-email`, `un-phone`, `message`) VALUES(%s, %s, %s, %s, %s, %s);"

        try: 
            with mysql.connector.connect(**param) as db:
                with db.cursor() as c:
                    c.execute(sql, value)
                    db.commit()
                    c.close()
                    db.close()
        except:
            raise DatabasesApplyError(f"Apply error")
        
    def applyCo(self, data, id_user):
        """function Apply connected 

        Args:
            data (json): Data of the user when Apply

        Raises:
            DatabasesApplyError: Raise if there is a error with database
        """
        param = self.sql_connexion()
        value = (data["id"], id_user, data["message"])
        sql = "INSERT INTO `apply-connected` (`co-advertising-id`, `co-user-id`, `co-message`) VALUES(%s, %s, %s);"
         
        with mysql.connector.connect(**param) as db:
            with db.cursor() as c:
                c.execute(sql, value)
                db.commit()
                c.close()
                db.close()

    def get_user(self):
            """Get all users into database

            Raises:
                DatabasesInsertError: trigger when there is a databases Error

            Returns:
                tab[json]: Return all users in databases
            """
            param = self.sql_connexion()

            request = "select * from user;"
            users = []
            try:
                with mysql.connector.connect(**param) as db:
                    with db.cursor() as c:
                        c.execute(request)
                        resultats = c.fetchall()
                        for user in resultats:
                            users.append(
                                {'id': user[0], 'firstName':user[1], 'lastName':user[2], 'email':user[3],
                                            'phone':user[4], 'date':user[6].strftime("%Y-%m-%d")}
                            )
            except:
                raise DatabasesInsertError(f"Get user error")
            return users
    
    def get_comp(self):
            """Get all compagnies into database

            Raises:
                DatabasesInsertError: trigger when there is a databases Error

            Returns:
                tab[json]: Return All compagnies in databases
            """
            param = self.sql_connexion()

            request = "select * from compagnies;"
            compagnies = []
            try:
                with mysql.connector.connect(**param) as db:
                    with db.cursor() as c:
                        c.execute(request)
                        resultats = c.fetchall()
                        for compagnie in resultats:
                            compagnies.append(
                                {'id': compagnie[0], 'name':compagnie[1], 'sector':compagnie[2], 'city':compagnie[3],
                                            'link':compagnie[4], 'weight':compagnie[5], "turnover" : compagnie[6]}
                            )
            except:
                raise DatabasesInsertError(f"Insert compagnies error")
            return compagnies
    def get_profile(self, token):
        param = self.sql_connexion()

        token = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        id = token['id'] 
        request = "select * from user where `user-id` LIKE " +str(id)+";"
     
        
        with mysql.connector.connect(**param) as db:
            with db.cursor() as c:
                c.execute(request)
                resultats = c.fetchone()
                data = {"firstName": resultats[1], "lastName": resultats[2], "email": resultats[3], "phone": resultats[4]}
        return data

    def get_adv(self, token):
        param = self.sql_connexion()

        token = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        id = token['id']
        request = "select `advertising-title`, `advertising-companies` from `advertising`, `apply-connected` where `apply-connected`.`co-user-id` LIKE " +str(id)+" AND `apply-connected`.`co-advertising-id` LIKE `advertising`.`advertising-id`;"
        advs = []
        with mysql.connector.connect(**param) as db:
            with db.cursor() as c:
                c.execute(request)
                resultats = c.fetchall()
                for adv in resultats:
                    advs.append(
                        {'title': adv[0], 'compagnies':adv[1]})
        return advs

    def get_profile(self, token):
        param = self.sql_connexion()

        token = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
        id = token['id'] 
        request = "select * from user where `user-id` LIKE " +str(id)+";"
     
        
        with mysql.connector.connect(**param) as db:
            with db.cursor() as c:
                c.execute(request)
                resultats = c.fetchone()
                data = {"firstName": resultats[1], "lastName": resultats[2], "email": resultats[3], "phone": resultats[4]}
        return data
    

    def change_value(self, data, id):
        param = self.sql_connexion()
        values = ""
        drapeau = 0
        for object in data:
            match object:
                case "firstName":
                    values += "`user-firstName` = '"+data["firstName"]+"'"
                case "lastName":
                    values += "`user-lastName` = '"+data['lastName']+"'"
                case "phone":
                    values += "`user-phone` = '"+data["phone"]+"'"
            drapeau = drapeau + 1
            if drapeau < len(data) :
                values += ", "

        request = "UPDATE user SET "+values+" WHERE `user-id` = "+str(id)+";"
        with mysql.connector.connect(**param) as db:
            with db.cursor() as c:
                c.execute(request)
                results = c.fetchall()
                db.commit()
                c.close()
                db.close()
                return results