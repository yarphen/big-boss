# Big Boss API

Big Boss API is backend core for platform of role-based and hierarchical user management.

# How to use?

## Auth API

### **SIGNUP**

* **URL**: `/auth/signup`
* **METHOD**: `POST`
* **DESCRIPTION**: Creates new account
* **SAMPLE REQUEST**:
```
{
	"password": "abc",
	"email": "example@gmail.com",
	"name": "Test Test",
	"about": "XXX"
}
```
* **SAMPLE RESPONSES**:
```
{
    "userId": 4,
    "email": "example@gmail.com",
    "name": "Test Test",
    "roleId": 1,
    "bossId": 1,
    "about": "XXX",
    "createdAt": "2018-08-02T09:13:41.316Z",
    "updatedAt": "2018-08-02T09:17:35.679Z"
}
```
```
{
  "error": "User with this email already exists"
}
```

### **LOGIN**

* **URL**: `/auth/login`
* **METHOD**: `POST`
* **DESCRIPTION**: Allows you to log in and get your auth token. After getting token use it for bearer Authorization.
* **SAMPLE REQUEST**:
```
{
	"password": "abc",
	"email": "example@gmail.com"
}
```
* **SAMPLE RESPONSES**:
```
{
    "user": {
        "userId": 4,
        "email": "example@gmail.com",
        "name": "Test Test",
        "roleId": 1,
        "bossId": 1,
        "about": "XXX",
        "createdAt": "2018-08-02T09:13:41.316Z",
        "updatedAt": "2018-08-02T09:17:35.679Z",
        "hash": "6ed2bf5ce8c7bb7d279ecafcc57498c10e20a4a9889d86afb961426fce40d5b0d2104f4132bb99abee23b7ebe617940393ee70b6e7ce0b1462c57f2b94039000"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImVtYWlsIjoiZXhhbXBsZUBnbWFpbC5jb20iLCJuYW1lIjoiVGVzdCBUZXN0IiwiYWJvdXQiOiJYWFgiLCJjcmVhdGVkQXQiOiIyMDE4LTA4LTAyVDA5OjEzOjQxLjMxNloiLCJ1cGRhdGVkQXQiOiIyMDE4LTA4LTAyVDA5OjE3OjM1LjY3OVoiLCJoYXNoIjoiNmVkMmJmNWNlOGM3YmI3ZDI3OWVjYWZjYzU3NDk4YzEwZTIwYTRhOTg4OWQ4NmFmYjk2MTQyNmZjZTQwZDViMGQyMTA0ZjQxMzJiYjk5YWJlZTIzYjdlYmU2MTc5NDAzOTNlZTcwYjZlN2NlMGIxNDYyYzU3ZjJiOTQwMzkwMDAiLCJpYXQiOjE1MzMyMDE1MTB9.cQB4v2O-4VrwxadgUzyMDea9xii0JwD1wWR3Cd6TDCM"
}
```
```
{
    "message": "Login failed"
}
```

### **RESET PASSWORD**

* **URL**: `/auth/reset`
* **METHOD**: `POST`
* **DESCRIPTION**: Resets your password if you provide correct email and sends it to your email.
* **SAMPLE REQUEST**:
```
{
	"email": "example@gmail.com"
}
```
* **SAMPLE RESPONSES**:
```
{
    "message": "Check your email, please"
}
```

### **VERIFY YOU ARE LOGGED IN**

* **URL**: `/auth/verify`
* **METHOD**: `POST`
* **NEEDS AUTHORIZATION**
* **DESCRIPTION**: Retrieves your user if you are logged in
* **SAMPLE RESPONSES**:
```
{
    "user": {
        "userId": 4,
        "email": "example@gmail.com",
        "name": "Test Test",
        "roleId": 1,
        "bossId": 1,
        "about": "XXX",
        "createdAt": "2018-08-02T09:13:41.316Z",
        "updatedAt": "2018-08-02T09:17:35.679Z"
    }
}
```

## User API

### **USER LIST**

* **URL**: `/users`
* **METHOD**: `GET`
* **NEEDS AUTHORIZATION**
* **DESCRIPTION**: Retrieves list of users who is accessible (direct or nested subordinate) to current user, including herself/himself.
* **SAMPLE RESPONSES**:
```
[
    {
        "userId": 4,
        "email": "example@gmail.com",
        "name": "Test Test",
        "roleId": 1,
        "bossId": 1,
        "about": "XXX",
        "createdAt": "2018-08-02T09:13:41.316Z",
        "updatedAt": "2018-08-02T09:17:35.679Z"
    }
]
```

### **GET USER BY ID**

* **URL**: `/users/:id`
* **METHOD**: `GET`
* **NEEDS AUTHORIZATION**
* **DESCRIPTION**: Gets user by id. 
* **SAMPLE RESPONSES**:
```
{
    "userId": 4,
    "email": "example@gmail.com",
    "name": "Test Test",
    "roleId": 1,
    "bossId": 1,
    "about": "XXX",
    "createdAt": "2018-08-02T09:13:41.316Z",
    "updatedAt": "2018-08-02T09:17:35.679Z"
}
```
```
{
    "error": "Access denied"
}
```

### **PROFILE UPDATE**

* **URL**: `/users/:id`
* **METHOD**: `PATCH`
* **NEEDS AUTHORIZATION**
* **DESCRIPTION**: Updates specified fields of your profile if you set non-empty values to them. Allows to change your password: for this you should specify `password` and `passwordConfirm` both. They should match.
* **SAMPLE REQUEST**:
```
{
    "email": "mynewemail@gmail.com",
    "name": "MyNewName",
    "roleId": 1,
    "bossId": 1,
    "about": "I'm agent 007",
    "password": "MySuperCryptoPasswordBlaBlaBla",
    "passwordConfirm": "MySuperCryptoPasswordBlaBlaBla"
}
```
* **SAMPLE RESPONSES**:
```
{
    "userId": 4,
    "email": "mynewemail@gmail.com",
    "name": "MyNewName",
    "roleId": 1,
    "bossId": 1,
    "about": "I'm agent 007",
    "createdAt": "2018-08-02T09:13:41.316Z",
    "updatedAt": "2018-08-02T09:43:14.758Z"
}
```
```
{
    "error": "Passwords do not match"
}
```
```
{
    "error": "Permission denied"
}
```

## Subordinates API

### **USER SUBORDINATES LIST**

* **URL**: `/users/:userId/subs`
* **METHOD**: `GET`
* **NEEDS AUTHORIZATION**: The user to view his/her subordinates must be your subordinate.
* **DESCRIPTION**: Gets all direct subordinates of specified user.
* **SAMPLE RESPONSES**:
```
[
    {
        "userId": 4,
        "email": "example1@gmail.com",
        "name": "Test Test",
        "roleId": 1,
        "bossId": 2,
        "about": "XXX",
        "createdAt": "2018-08-02T09:13:41.316Z",
        "updatedAt": "2018-08-02T09:17:35.679Z"
    },
    {
        "userId": 5,
        "email": "example2@gmail.com",
        "name": "Test Test",
        "roleId": 1,
        "bossId": 2,
        "about": "XXX",
        "createdAt": "2018-08-02T09:13:41.316Z",
        "updatedAt": "2018-08-02T09:17:35.679Z"
    }
]
```
```
{
    "error": "Access denied"
}
```

### **SET USER'S BOSS / ADD SUBORDINATE TO SOMEBODY**

* **URL**: `/users/:bossId/subs`
* **METHOD**: `POST`
* **NEEDS AUTHORIZATION**
* **DESCRIPTION**: Sets user's boss to specified in path param `bossId`, may also affect role of current and old boss (upgrade curren boss from regular user or downgrade previos boss to regular user).
* **SAMPLE REQUEST**:
```
{
	"userId": 4
}
```
* **SAMPLE RESPONSES**: 
```
{
    "userId": 4,
    "roleId": 1,
    "bossId": 3,
    "email": "user1@gmail.com",
    "name": "Boss",
    "about": "XXX",
    "createdAt": "2018-08-03T18:35:49.167Z",
    "updatedAt": "2018-08-03T19:39:44.004Z"
}
```
```
{
    "error": "Circular dependency is not allowed!"
}
```
```
{
    "error": "Access denied"
}
```

# How to run?
You can:
  - Clone manually, install node_modules, pass own environemnt variables (with .envrc file etc)
  - ... or just build it with docker

How many scripts the project contains?
  - main script for starting simply / for starting with forever (can be run with `npm start` / `npm run forever`)
  - ESLint script (can be run with `npm run lint`)

## Usage with docker

Here is sample deploy script for dockerized app:

```
docker stop my-big-boss 
docker rm my-big-boss
docker build -t yarphen/big-boss --no-cache git@github.com:yarphen/big-boss.git#${1:master}
docker run -d --name=my-big-boss \
-p 8888:8888 \
-e PORT="8888" \
-e DB_HOST="postgres.example.com" \
-e DB_PORT="5432" \
-e DB_NAME="mydb" \
-e DB_USERNAME="postgres" \
-e DB_PASSWORD="your_password" \
-e JWT_SECRET="bla-bla-bla" \
-e SMTP_HOST="smtp.gmail.com" \
-e SMTP_PORT="587" \
-e SMTP_USER="example@gmail.com" \
-e SMTP_PASS="bla-bla-bla" \
-e SMTP_FROM="example@gmail.com" \
-e SMTP_SECURE="false" \
--restart=always yarphen/big-boss
```

### Evironment

`PORT` - sets the port to run the API


`DB_HOST` - sets the host of postgres db connection

`DB_PORT` - sets the port of postgres db connection

`DB_NAME` - sets the name of postgres db connection

`DB_USERNAME` - sets the username for postgres db connection

`DB_PASSWORD` - sets the password for postgres db connection


`JWT_SECRET` - sets the jwt secret for making Json Web Tokens.


`SMTP_HOST` - sets the host of smtp server to send reset pass email

`SMTP_PORT` - sets the port of smtp server to send reset pass email

`SMTP_USER` - sets the username for smtp server to send reset pass email

`SMTP_PASS` - sets the password for smtp server to send reset pass email

`SMTP_SECURE` - sets the **secure** flag for smtp server connection
