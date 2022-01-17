import os
import secrets
from PIL import Image
from flask import url_for, current_app
from flask_mail import Message
from bba import mail


# pic from the form
def save_picture(form_picture):
    # this is to rename the picture file name before saved into database 
    random_hex = secrets.token_hex(8)
    # for generating file extension
    _, f_ext = os.path.splitext(form_picture.filename)
    # combine the file extension to have the filename
    picture_fn = random_hex + f_ext
    #saving path for the new profile pic
    picture_path = os.path.join(current_app.root_path, 'static/profile_pics', picture_fn)

    #resizing of image into a smaller size before saving
    output_size = (125, 125)
    #recreation of new image
    i = Image.open(form_picture)
    #resizing
    i.thumbnail(output_size)
    #save the picture in the data base
    i.save(picture_path)

    return picture_fn


def send_reset_email(user):
    token = user.get_reset_token()
    msg = Message('Password Reset Request', sender='oseiprempehwilliams@gmail.com', recipients=[user.email])
    msg.body = f'''To reset ypur password, visit the following link:
    {url_for('users.reset_token', token=token, _external=True)}
    If you did not make this request then simply ignore this email and no changes will be made
    '''
    mail.send(msg)