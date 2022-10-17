from distutils.core import setup

setup(name='jobboard',
      version='0.0',
      description='Description',
      author='Paolo Arthur',
      author_email='arthur.trusgnach@epitech.eu',
      url=' ',
      install_requires=[
            # TODO
            "Flask >=2.0.3,<3.0",
            "flask-socketio >=5.1.1, <6.0.0",
        ],
        extras_require={
            "dev": [
                "recommonmark",
                "sphinx",
                "sphinx-rtd-theme",
                "mypy",
                "pylint",
            ],
            "test": [
                "pytest",
                "pytest-cache",
                "pytest-coverage",
                "pytest-icdiff",
            ],
        }
     )