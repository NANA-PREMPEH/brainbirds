from flask import render_template, url_for, flash, redirect, request, Blueprint
from flask_login import login_user, current_user, logout_user, login_required
from bba import db, bcrypt
from bba.models import User, Post
from bba.users.forms import (RegistrationForm, LoginForm, UpdateAccountForm, RequestResetForm, ResetPasswordForm)
from bba.users.utils import save_picture, send_reset_email

users = Blueprint('users', __name__)

@users.route("/register", methods=['GET', 'POST'])
def register():
    # to keep user at the home if user has already login
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    form = RegistrationForm()
    # checking if the details are validate
    if form.validate_on_submit():
        # for generating a hash password in string
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        # assigning a hashed password not user password
        user = User(username=form.username.data, email=form.email.data, password=hashed_password)
        db.session.add(user) # to add user to the database
        db.session.commit() # to write changes 
        # giving a flash message to the user with bootstrap class(category)
        flash('Your account has been created! You are now able to log in', 'success')
        #redirecting the user to the login page
        return redirect(url_for('users.login'))
    return render_template('register.html', title='Register', form=form)

@users.route("/login", methods=['GET','POST'])
def login():
    # to keep user at the home if user has already login
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    form = LoginForm()
    if form.validate_on_submit():
            #checking if email exist in the database
            user = User.query.filter_by(email=form.email.data).first()
            # checking if the password the user privided is same as the one in the datebase
            if user and bcrypt.check_password_hash(user.password, form.password.data):
                # if yes then
                login_user(user, remember=form.remember.data)
                # deals with when the user has logged in before in the current page such account page and want to access it again
                next_page = request.args.get('next')
                return redirect(next_page) if next_page else redirect(url_for('main.home'))
                # or then give the user this massege
            else:
                flash('Login Unsuccessful. Please check email and password', 'danger')
    return render_template('login.html', title='Login', form=form)

@users.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('main.home'))


@users.route("/account", methods=['GET','POST'])
# decorator
@login_required
def account():
    form = UpdateAccountForm()
    if form.validate_on_submit():
    #checking if there is any picture data on the form
        if form.picture.data:
            # setting user profile picture
            picture_file = save_picture(form.picture.data)
            current_user.image_file = picture_file
        # update the data
        current_user.username = form.username.data
        current_user.email = form.email.data 
        db.session.commit()
        flash('Your account has been updated', 'success')
        return redirect(url_for('users.account'))
    elif request.method == 'GET':
        # this will populate the datails of the user in the text filed on the account form 
        form.username.data = current_user.username
        form.email.data = current_user.email
    image_file = url_for('static', filename='profile_pics/' + current_user.image_file)
    return render_template('account.html', title='Account', image_file=image_file, form=form)


@users.route("/user/<string:username>")
def user_posts(username):
    #displays the posts saved in the database at the home page always
    page = request.args.get('page', 1, type=int)
    #displaying just the post of the Poster after clicking on the user poster's Name
    user = User.query.filter_by(username=username).first_or_404()
    #paginate is the number of page to display on the web page
    #post.date_posted.desc is the arrangement for the post on th page
    posts = Post.query.filter_by(author=user)\
        .order_by(Post.date_posted.desc())\
        .paginate(page=page, per_page=5)
    return render_template('user_posts.html', posts=posts, user=user)

@users.route("/reset_password", methods=['GET', 'POST'])
def reset_request():
    # user been logged out before resetting password
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    form = RequestResetForm()
    if form.validate_on_submit():
        # sending email
        user = User.query.filter_by(email=form.email.data).first()
        send_reset_email(user)
        flash('An email has been sent with instructions to request your password.', 'info')
        return redirect(url_for('users.login'))
    return render_template('reset_request.html', title='Reset Password', form=form)


@users.route("/reset_password/<token>", methods=['GET', 'POST'])
def reset_token(token):
    # user been logged out before resetting password
    if current_user.is_authenticated:
        return redirect(url_for('main.home'))
    user = User.verify_reset_token(token)
    if user is None:
        flash('That is an invalid or expired token', 'warning')
        return redirect(url_for('users.reset_request'))
    form = ResetPasswordForm()
    if form.validate_on_submit():
        # for generating a hash password in string
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        # updating the old password
        user.password = hashed_password
        db.session.add(user) # to add user to the database
        db.session.commit() # to write changes 
        # giving a flash message to the user with bootstrap class(category)
        flash('Your account has been updated! You are now able to log in', 'success')
        #redirecting the user to the login page
        return redirect(url_for('users.login'))
    return render_template('reset_token.html', title='Reset Password', form=form)