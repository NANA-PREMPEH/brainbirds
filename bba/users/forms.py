from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, PasswordField, SubmitField, BooleanField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError
from flask_login import current_user
from bba.models import User

class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=2, max=20)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Sign Up')

    # validating username field
    def validate_username(self, username):    # username.data is what is coming from the forms
        user = User.query.filter_by(username=username.data).first()
        # checking whether the exist in the database
        if user:
            raise ValidationError('That username is taken. please choose a different one.')

            # validating username field
    def validate_email(self, email):    # username.data is what is coming from the forms
        user = User.query.filter_by(email=email.data).first()
        # checking whether the exist in the database
        if user:
            raise ValidationError('That Email is taken. please choose a different one.')

class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember = BooleanField('Remember Me')
    submit = SubmitField('Login')


class UpdateAccountForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=2, max=20)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    # for accepting pictures with file format
    picture = FileField('Update Profile Picture', validators=[FileAllowed(['jpg','png'])])
    submit = SubmitField('Update')

    # validating username field
    def validate_username(self, username):    # username.data is what is coming from the forms
        # checking the data entered via the form
        if username.data != current_user.username:
            user = User.query.filter_by(username=username.data).first()
            # checking whether the exist in the database
            if user:
                raise ValidationError('That username is taken. please choose a different one.')

            # validating username field
    def validate_email(self, email):    # username.data is what is coming from the forms
        # checking the data entered via the form (current_user.email)
        if email.data != current_user.email:
            user = User.query.filter_by(email=email.data).first()
            # checking whether the exist in the database
            if user:
                raise ValidationError('That Email is taken. please choose a different one.')

class RequestResetForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    submit = SubmitField('Request Password Reset')

    # checking if the email doesnt exit
    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user is None:
            raise ValidationError('There is no account with the email. You must register first.')


class ResetPasswordForm(FlaskForm):
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Reset Password')