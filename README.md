<div align="center" id="top"> 
  <img src="./.github/app.gif" alt="JobBoard" />

  &#xa0;

</div>

<h1 align="center">JobBoard</h1>

<p align="center">
  <a href="#dart-about">About</a> &#xa0; | &#xa0; 
  <a href="#sparkles-features">Features</a> &#xa0; | &#xa0;
  <a href="#rocket-technologies">Technologies</a> &#xa0; | &#xa0;
  <a href="#white_check_mark-requirements">Requirements</a> &#xa0; | &#xa0;
  <a href="#checkered_flag-starting">Starting</a> &#xa0; | &#xa0;
  <a href="#memo-license">License</a> &#xa0; | &#xa0;
  <a href="https://github.com/Gaother" target="_blank">Paolo</a>
  <a href="https://github.com/Arthur24-t" target="_blank">Arthur</a>
</p>

<br>

## :dart: About ##

We made a site to find a job, a bit like indeed. Our Back is in Python under Flask and our Front is in javascript under React 

## :sparkles: Features ##

:heavy_check_mark: See all jobs in the databases on main page\
:heavy_check_mark: You can see all job detail\
:heavy_check_mark: User can apply to the jobs they want with and without connection\
:heavy_check_mark: User can register and connect\
:heavy_check_mark: User can mofidy their profile\
:heavy_check_mark: Admin have a page to manage all data (CRUD);

## :rocket: Technologies ##

The following tools were used in this project:

- [React](https://pt-br.reactjs.org/)
- [Javascript](https://www.typescriptlang.org/)
- [Python3](https://www.python.org)
- [Flask](https://flask.palletsprojects.com/en/2.2.x/)
- [MySQL](https://www.mysql.com/fr/)

## :white_check_mark: Requirements ##

Before starting :checkered_flag:, you need to have [Git](https://git-scm.com), [Node](https://nodejs.org/en/), [Docker](https://www.docker.com) and [Python](https://www.python.org) installed.

## :checkered_flag: Starting ##

```bash
# Clone this project
$ git clone https://github.com/EpitechMscProPromo2025/T-WEB-501-LIL-5-1-jobboard-arthur.trusgnach.git

# Access
$ cd t-web-501-lil-5-1-jobboard-arthur-trusgnach

# Install Docker MySQL (default password root is '1234' and default port is 3306)
$ sudo docker-compose up -d   

# Install dependencies for the React application 
$ cd front
$ npm install 

# Install dependencies for the Flask API 
$ cd back
$ pip install -r requirements.txt

# Run the React application
$ npm start

# Run the Flask API
$ flask run

# The server will initialize in the <http://localhost:3000> for React 
# The server will initialize in the <http://localhost:5000> for Flask 
```

## :memo: License ##

Made with :heart: by <a href="https://github.com/Gaother" target="_blank">Paolo</a> and <a href="https://github.com/Arthur24-t" target="_blank">Arthur</a>

&#xa0;

<a href="#top">Back to top</a>
