# Backend Task

### Setup

This project requires [Node.js](https://nodejs.org/en/download/)

To get up and running: 

- Clone the repo.
```
git clone git@github.com:mosesokemwa/hackerbay-backend.git
```

- Change terminal path to the the project folder
```
cd hackerbay-backend
```
- Create a ```.env``` file and set ```jwtSecret``` to any secret phrase you want.
- Install project dependencies with
```
npm install
```
- Start the app using `npm start`, it will be runningpn PORT `3000`.

### Alternative project setup
- **via curl**

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/mosesokemwa/hackerbay-backend/develop/setup.sh)"
```

- **via wget**
```shell
sh -c "$(wget -O- https://raw.githubusercontent.com/mosesokemwa/hackerbay-backend/develop/setup.sh)"
```
- Change directories `cd hackerbay-backend`
- Then run `npm start` in your terminal

### HTTP Rest Client Tool
For testing the API endpoints I'm using [Insomnia](https://insomnia.rest/), a rest client

### Public Endpoints
#### Login
Request body should contain an arbitrary username/password pair
Treat it as a mock authentication service and accept any username/password.
Return a signed Json Web Token(JWT, https://jwt.io/) which can be used to validate future requests.

- You can pass in any username or password to login.
- Set the request to `POST` and the url to `/api/auth/login` 
- In the `Body` for Insomnia request, select `JSON` and set username and password keys
- Hit ```Send``` and you will get response with user's name and token

```json
// set this in the body
{
    "username":"replace-with-random-username",
    "password":"replace-with-random-passowrd"
}
```
 ```json
//  expected response
 {
    "user": "replace-with-random-username",
    "authorized": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlcGxhY2Utd2l0aC1yYW5kb20tdXNlcm5hbWUiLCJpYXQiOjE1Njc2MDEzMTYsImV4cCI6MTU2NzYzNzMxNn0.fmHWQp8SEbBpuYLz0vjHK-tdHHFZeA4jRWXwPSfGqAI"
}
 ```

---
### Protected Endpoints
#### Apply Json Patch
- Set request to **PATCH**
- the URL to use is 'api/apply-json-patch'
- Set token in Header of the request, header key will be `token` and value will be the token recieved after **login**.
- In the `Body` for Insomnia request, select `JSON` and set the key ```jsonObject``` to an object you would like to patch. Set the key ```jsonPatchObject``` to the object you want to use to patch the ```jsonObject```
- Hit `Send`

```json
// expected json body
{
	"jsonObject" :
	{ 
		"user": { 
			"firstName": "Moses", 
			"lastName": "Okemwa" 
		} 
	},
	"jsonPatchObject": [
		{
			"op": "replace", 
			"path": "/user/firstName", 
			"value": "Okemwa"
		},
		{
			"op": "replace", 
			"path": "/user/lastName", 
			"value": "Moses"}
	]
}
```

```json
// expected response
{
    "patchedObject": {
        "user": {
            "firstName": "Okemwa",
            "lastName": "Moses"
        }
    },
    "err": {}
}
```

#### Create Thumbnail
Request should contain a public image URL.
Download the image, resize to 50x50 pixels, and return the resulting thumbnail.

- Set request to **POST**
- the URL to use is 'api/create-thumbnail'
- Set token in Header of the request, header key will be 'token' and value will be the token recieved after authentication.
- In the `Body` for Insomnia request, select `JSON` and set the key ```imgUrl``` to a url of an image you would like to use
- This request will download teh image and resize it to 50x50 pixels

```json
// expected json body
{
    "imageUrl": "https://xyzwuvn.co.ke/img/min/me4.jpg"
}
```

```json
// expected response
 {
    "converted": true,
    "user": "moses",
    "success": "Image has been resized",
    "thumbnail": "./public/images/resize/"
}
```

#### Running test suite
Run ```npm test``` from the application's root directory.

#### Other Requirements 
- Use Git for version control, and host the project in a Github repository.
- Project should contain documentation with setup and usage instructions.
- Project should install all dependencies with “npm install”, should start the server with “npm start”, and should run the test suite with “npm test”.
- Really, please just don’t use “console.log” as the primary debugging/logging tool.
- Javascript Style and Linting
- Use a javascript linter, along with a linting npm script. We like clean code.
- Dockerize
- Include a working Dockerfile with the app directory.
- Push a docker image to public DockerHub, and share the link


#### Bonus Points 
- 100% code coverage in test suite.
- We recommend using Istanbul (https://github.com/gotwarlost/istanbul) to generate code test coverage reports.
- Extra Documentation
- Include JSdoc comments and/or Swagger specifications to impress us.
- Logging / Monitoring
- Integrate a centralized app logging/monitoring system.



#### How we will judge the task 
- Project organization and code readability (40%)
- API functionality correctness (15%)
- Input validation and error handling (15%)
- API speed and efficiency (10%)
- Documentation (10%)
- Unit Test Coverage (10%)
- Bonus Points (up to +20%)


#### Important

Please DO NOT fork this repo. Instead send the GitHub link to someone who interviewed you to take the interview forward. 


