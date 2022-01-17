
from enum import unique
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref
from flask_bcrypt import Bcrypt # for password hashing
#initializing
from flask_login import LoginManager
from flask_mail import Mail
from bba.config import Config
from flask_ckeditor import CKEditor, CKEditorField

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy()
bcrypt = Bcrypt()
# for CKEDITOR text editor
ckeditor = CKEditor(app)

# adding some functional to database modules
login_manager = LoginManager() # handle section in the background
# for logging in to access a page.
login_manager.login_view = 'users.login' # function name of a route
# for giving quick message when logged in
login_manager.login_message_category = 'info'


mail = Mail()

# importing blueprint object
from bba.users.routes import users
from bba.posts.routes import posts
from bba.main.routes import main

app.register_blueprint(users)
app.register_blueprint(posts)
app.register_blueprint(main)


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(Config)

    # grouping app instances by passing in app as arguement
    db.init_app(app)
    bcrypt.init_app(app)
    login_manager.init_app(app)
    mail.init_app(app)
    # initialing ckeditor text editor
    ckeditor.init_app(app)

    # importing blueprint object
    # Registrying application
    from bba.users.routes import users
    from bba.posts.routes import posts
    from bba.main.routes import main
    from bba.errors.handlers import errors

    app.register_blueprint(users)
    app.register_blueprint(posts)
    app.register_blueprint(main)
    app.register_blueprint(errors)

    return app