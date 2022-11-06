# bloggin

This is an api for a blog app

Requirements
Users should have a first_name, last_name, email, password e.t.c.
A user should be able to sign up and sign in into the blog app
user can sign in and have jwt token that expires after an hour
Logged in users can create a blog.
Logged in and not logged in users can not get a list of published blogs created
Logged in and not logged in users can get a published blog
When a blog is created, it is in draft state
The owner of the blog can update the state of the blog to published
 The owner of a blog can edit the blog in draft or published state
 The owner of the blog can to delete the blog in draft or published state
The owner of the can get a list of their blogs. 
Tests for all endpoints


Setup
Install NodeJS, mongodb
pull this repo
update env with example.env
run npm run start
Base URL
https://bloggin.onrender.com
Models
User
field	data_type	constraints
id	string	required
username	string	required
firstname	string	optional
lastname	string	optional
email	string	optional
password	string	required
user_type	string	required, default: user, enum: ['user', 'admin']
Blog
field	data_type	constraints
id	string	required
created_at	date	required
state	draft, published	required,default:draft

APIs
Signup User
Route: /register
Method: POST
Body:
{
  "email": "doe@example.com",
  "password": "password",
  "firstname": "Deji",
  "lastname": "Adeosun",
}
Responses
Success

{
    message: 'Account created successfully.',
    }
}
Login User
Route: /login
Method: POST
Body:
{
  "password": "password",
  "email": 'adeosundeji2@gmail.com",
}
Responses
Success

{
    message: 'Login successful',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzY0NGU2NDMyMTAyMGZmNzcyOGY5NTAiLCJlbWFpbCI6ImFkZW9zdW5kZWppMkBnbWFpbC5jb20iLCJwaG9uZSI6IjA4MDk3ODU2Mzk4IiwiaWF0IjoxNjY3NzQ4NzA0LCJleHAiOjE2Njc3NTIzMDR9.l-XGr0UxXL0tHthEHon2qulM4hhJMa3HaDKqOC4YrEI'
}
Create Blog
Route: /
Method: POST
Header
Authorization: Bearer {token}
Body:
{
    "post": ""
}
Responses
Success

{
    message: "Post created successfully"
}
Get blogs
Route: /getAllPost
Method: GET
Header
Authorization: Bearer {token}
Responses
Success

{
  message: "All posts."
}

...

Contributor
Adeosun Deji
