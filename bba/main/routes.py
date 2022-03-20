import re
from flask import render_template, request, Blueprint
from bba.models import Post

main = Blueprint('main', __name__)

@main.route("/")
@main.route("/home")
def home():
    #displays the posts saved in the database at the home page always
    # page = request.args.get('page', 1, type=int)
    #paginate is the number of page to display on the web page
    #post.date_posted.desc is the arrangement for the post on th page
    # posts = Post.query.order_by(Post.date_posted.desc()).paginate(page=page, per_page=5)
    #return render_template('homepage/homepage_standard.html')
    return render_template('main/home.html')


@main.route("/about")
def about():
    return render_template('about.html', title='About')

@main.route("/about_us")
def about_us():
    return render_template('main/about_us.html', title='About Us')

@main.route("/admission")
def admission():
    return render_template('main/admission.html', title='Admission')

@main.route("/contact_us")
def contact_us():
    return render_template('main/contact_us.html', title='Contact Us')

@main.route("/plans")
def plans():
    return render_template('main/plans.html', title='Plans')

@main.route("/the_bb")
def the_bb():
    return render_template('main/the_bb.html', title='The BrainBirds')
