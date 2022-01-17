from flask import (render_template, url_for, flash, redirect, request, abort, Blueprint)
from flask_login import current_user, login_required
from bba import db
from bba.models import Post
from bba.posts.forms import PostForm


posts = Blueprint('posts', __name__)

@posts.route("/post/new", methods=['GET','POST'])
#decorator
@login_required
def new_post():
    #instant for the post_form
    form = PostForm()
    #if the user has successfully submitted the form 
    if form.validate_on_submit():
        post = Post(title=form.title.data, content=form.content.data, author=current_user)
        db.session.add(post)
        db.session.commit()
        flash('Your post has been created', 'success')
        return redirect(url_for('main.home'))
    return render_template('create_post.html', title='New Post', form=form, legend='New Post')

#for list of posts in the database post/1....100
@posts.route("/post/<int:post_id>")
def post(post_id):
    #disply post saved in the database or display 404 error
    post = Post.query.get_or_404(post_id)
    return render_template('post.html', title=post.title, post=post)


#for list of posts in the database post/1....100
@posts.route("/post/<int:post_id>/update", methods=['GET', 'POST'])
@login_required
def update_post(post_id):
    #disply post saved in the database or display 404 error
    post = Post.query.get_or_404(post_id)
    #for the only the user who created this post to delete
    if post.author != current_user:
        abort(403)
    form = PostForm()
    if form.validate_on_submit():
        #assigning by accepting data that populated in the form and save into the database
        post.title = form.title.data
        post.content = form.content.data
        db.session.commit()
        flash('Your post has been updated!', 'success')
        return redirect(url_for('posts.post', post_id=post.id))
    elif request.method == 'GET':
        #populate data in the database on the form
        form.title.data = post.title
        form.content.data = post.content
    return render_template('create_post.html', title='Update Post', form=form, legend='Update Post')

@posts.route("/post/<int:post_id>/delete", methods=['POST'])
@login_required
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    if post.author != current_user:
        abort(403)
    db.session.delete(post)
    db.session.commit()
    flash('Your post has been deleted!', 'success')
    return redirect(url_for('main.home'))