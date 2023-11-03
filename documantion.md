# Blogs API Documantion

# Endpoints:

List of available endpoint:

- `POST /register`
- `POST /login`

Routes below need authentication:

- `GET /blogs`
- `GET /blogs/:blogId`
- `POST /blogs`
- `GET /comments/:postId`
- `POST /comments`

Routes below need authentication & authorization:

- `PUT /blogs/:blogId`
- `DELETE /blogs/:blogId`
- `PUT /comments/:commentId`
- `DELETE /comments/:commentId`

&nbsp;

## Models :

_Users_

```
- username : string, required
- email : string, required, unique
- password : string, required
```

_Posts_

```
- title: integer, required
- body : text, required
- userId : integer, required
```

_Comments_

```
- postId: integer, required
- userId : integer, required
- comment : text, required
```

## 1. POST /register

Description:
Creates a new user account.

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "response": {
    "status": 201,
    "message": "Register Created Succesfully"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "status": 400,
  "message": "Email is already in use. Please choose another email."
}
OR
{
  "status": 400,
  "message": "Invalid email format. Please provide a valid email address."
}
OR
{
  "status": 400,
  "message": "username fields are required. Please fill in all the fields."
}
OR
{
  "status": 400,
  "message": "email fields are required. Please fill in all the fields."
}
OR
{
  "status": 400,
  "message": "password fields are required. Please fill in all the fields."
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (201 - OK)_

```json
{
  "response": {
    "status": 201,
    "message": "Login successfully",
    "access_token": "string"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "status": 400,
  "message": "Email/Password  is required"
}
```

&nbsp;

## 3. GET /blogs

Description:
Get a list of all blogs.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "response": {
    "status": 200,
    "message": "Blogs retrieved successfully",
    "blogs": [
      {
        "id": 1,
        "title": "string",
        "body": "text",
        "userId": 1,
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      },
      {
        "id": 2,
        "title": "string",
        "body": "text",
        "userId": 2,
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      },
      ...
    ]
  }
}
```

## 4. GET /blogs/:blogId

Description:
Get details of a specific blog by ID.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "blogId": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "response": {
    "status": 200,
    "message": "Blog retrieved successfully",
    "blog": {
      "id": 1,
      "title": "string",
      "body": "text",
      "userId": 1,
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  }
}
```

_Response (404 - Bad Request)_

```JSON
{
  "status": 404,
  "message": "Blog not found"
}
```

## 5. POST /blogs

Description:
Create a new blog post.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- Body
  ```json
  {
    "title": "string",
    "body": "text"
  }
  ```

_Response (201 - OK)_

```json
{
  "response": {
    "status": 201,
    "message": "Blog created successfully",
    "blog": {
      "title": "string",
      "body": "text"
    }
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "status": 400,
  "message": "title fields are required. Please fill in all the fields."
}
OR
{
  "status": 400,
  "message": "body fields are required. Please fill in all the fields."
}
```

## 6. GET /comments/:postId

Description:
Get comments for a specific blog post by ID.
Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "postId": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "response": {
    "status": 200,
    "message": "Blog retrieved successfully",
    "comments": [
      {
        "id": 1,
        "postId": 1,
        "userId": 1,
        "comment": "text",
        "createdAt": "timestamp",
        "updatedAt": "timestamp"
      },
      ...
    ]
  }
}
```

_Response (404 - Bad Request)_

```JSON
{
  "status": 404,
  "message": "Comment not found"
}
```

## 7. POST /comments

Description:
Add a new comment to a blog post.

- headers:

```json
{
  "access_token": "string"
}
```

- Body
  ```json
  {
    "postId": 1,
    "comment": "text"
  }
  ```

_Response (201 - OK)_

```json
{
  "response": {
    "status": 201,
    "message": "Comment added successfully",
    "comment": {
      "postId": 1,
      "comment": "text"
    }
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "status": 400,
  "message": "postId fields are required. Please fill in all the fields."
}
OR
{
  "status": 400,
  "message": "comment fields are required. Please fill in all the fields."
}
```

## 8. PUT /blogs/:blogId

Description:
Update a specific blog post by ID.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "blogId": "integer (required)"
}
```

- Body
  ```json
  {
    "title": "string",
    "body": "text"
  }
  ```

_Response (200 - OK)_

```json
{
  "response": {
    "status": 200,
    "message": "Blog updated successfully"
  }
}
```

_Response (404 - Not Found)

```json
{
  "status": 404,
  "message": "Blog not found"
}
```

_Response (400 - Bad Request)_

```json
{
  "status": 400,
  "message": "title fields are required. Please fill in all the fields."
}
OR
{
  "status": 400,
  "message": "body fields are required. Please fill in all the fields."
}
```

## 9. DELETE /blogs/:blogId

Description:
Delete a specific blog post by ID.
Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "blogId": "integer (required)"
}
```
_Response (200 - OK)_

```json
{ "response": {
    "status": 200,
    "message": "Blog has been deleted"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "status": 404,
  "message": "Blog not found"
}
```

## 10. PUT /comments/:commentId

Description:
Update a specific comment by ID.

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "blogId": "integer (required)"
}
```

- Body
  ```json
  {
    "comment": "text"
  }
  ```

_Response (200 - OK)_

```json
{
  "response": {
    "status": 200,
    "message": "Comment updated successfully"
  }
}
```

_Response (404 - Not Found)

```json
{
  "status": 404,
  "message": "Comment not found"
}
```

## 11. DELETE /comments/:commentId

Description:
Delete a specific comment by ID.
Request:

- headers:

```json
{
  "access_token": "string"
}
```
- params:

```json
{
  "commentId": "integer (required)"
}
```

_Response (200 - OK)_

```json
{ "response": {
    "status": 200,
    "message": "Comment has been deleted"
  }
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Comment not found"
}
```

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "status": 401,
  "message": "Invalid token"
}
```

_Response (403 - Forbidden)_

```json
{
  "status": 403,
  "message": "You are not authorized"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "status": 500,
  "message": "Internal server error"
}
```
