from flask import Flask
from flask_cors import CORS

from back.blueprints.get_job import GETJOB
from back.blueprints.get_jobAdmin import GETJOBADMIN
from back.blueprints.get_jobAll import GETJOBALL
from back.blueprints.add_user import ADDUSER
from back.blueprints.connexion import CONNEX
from back.blueprints.add_job import ADDJOB
from back.blueprints.add_company import ADDCOMP
from back.blueprints.rem_job import REMJOB
from back.blueprints.update_job import UPJOB
from back.blueprints.apply import APPLY
from back.blueprints.exeception import ERROR
from back.blueprints.verify import VERIFY
from back.blueprints.get_profile import GETPROFILE
from back.blueprints.change_value import CHANGEVALUE
from back.blueprints.get_adv import GETADV
from back.blueprints.get_user import GETUSER
from back.blueprints.get_comp import GETCOMP
def create_app() -> Flask:
    """
    we create flask app
    """

    app = Flask(__name__)
    app.config['SECRET_KEY']='1234'
    app.register_blueprint(GETJOB)
    app.register_blueprint(GETJOBADMIN)
    app.register_blueprint(GETJOBALL)
    app.register_blueprint(ADDUSER)
    app.register_blueprint(CONNEX)
    app.register_blueprint(ADDJOB)
    app.register_blueprint(ADDCOMP)
    app.register_blueprint(REMJOB)
    app.register_blueprint(UPJOB)
    app.register_blueprint(APPLY)
    app.register_blueprint(ERROR)
    app.register_blueprint(VERIFY)
    app.register_blueprint(GETUSER)
    app.register_blueprint(GETCOMP)
    app.register_blueprint(GETPROFILE)
    app.register_blueprint(CHANGEVALUE)
    app.register_blueprint(GETADV)

    return app


if __name__ == "__main__":
    app = create_app()
    
    CORS(app.run())
