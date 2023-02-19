
# Medium-sample-service with Docker, Node and Sqlite

## What was used

- Docker
- Docker-Compose
- npm
- Node.js
- Express
- Nodemon
- Sequelize
- SQLite3

## To start run app Run
```
docker-compose up -d --build 
```
OR

```
make upd
```

![alt text](docs/3.png)

## Authorization EndPoints

```
POST  /auth/register
POST  /auth//login
POST  /auth/refresh
GET   /auth/logout
```

![alt text](docs/1.png)
![alt text](docs/2.png)


## Post EndPoints

```
GET      /api/v1/post
GET      /api/v1/post/:id
POST     /api/v1/post
POST     /api/v1/post/rating
PUT      /api/v1/post
DELETE   /api/v1/post/:id
```

## How to get access

> This process needs `Bearer Token` selected and need to add access_token.  

![alt text](docs/4.png)

## And then we can add/get/delete/update posts
![alt text](docs/5.png)


## To set rating to the post send request with data:
```json
{
  "id": "1",
  "rating": 5
}
```
![alt text](docs/6.png)


## User EndPoints

```
GET      /api/v1/users
GET      /api/v1/users/:id
```

## Posts and Users with pagination
se
![alt text](docs/7.png)
![alt text](docs/8.png)
