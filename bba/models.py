from datetime import datetime
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from flask import current_app
from bba import db, login_manager
from flask_login import UserMixin

# decorator
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model, UserMixin): # class been inherite from
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False)
    #creating Relationship between user and post
    posts = db.relationship('Post', backref='author', lazy=True)#for loading the data

    # for email secret key generate
    def get_reset_token(self, expires_sec=1800):
        s = Serializer(current_app.config['SECRET_KEY'], expires_sec)
        return s.dumps({'user_id': self.id}).decode('utf-8')

    @staticmethod # not to expect self parameter as a arguement but the token as an arguement
    def verify_reset_token(token):
        # create a serializer
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            user_id = s.loads(token)['user_id']
        except:
            return None
        # if dont get exception run this
        return User.query.get(user_id)


    #how object will be printed out
    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    content = db.Column(db.Text, nullable=False)
    #serving as the forign key
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

     #how object will be printed out
    def __repr__(self):
        return f"Post('{self.title}', '{self.date_posted}')"