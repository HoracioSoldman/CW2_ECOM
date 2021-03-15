# CW2_ECOM (F21EC)

You have two folders. The first one **front** for the Frontend and **api** for the backend.

We are using **yarn** as package manager for the repository.

## Installation
### 1. Clone the repo
```bash
   git clone git@gitlab-student.macs.hw.ac.uk:nja2000/cw2_ecom.git
```
### 2. Install dependencies
You can use yarn or npm

For yarn package manager
```bash
   yarn install
```
For npm 
```bash
   npm install
```
### 3. Database 
This project uses mongodb. Therefore, make sure to have it running in your environment otherwise [Install MongoDB](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials) in your local environment.

### 4. Environment configuration
Rename ``.env_copy`` file into ``.env``. Then change the values of the variables there according to your local environment.

```bash
    NODE_ENV = dev
    DB_HOST= 127.0.0.1
    DB_PORT= 27017
    DB_NAME = ec
    DB_USER = your_database_user
    DB_PWD = your_database_password
```
The ``NODE_ENV`` should be __dev__ in development development and __prod__ in production. The ``DB_*`` should correspond to your local configurations. 

## Running the app
There are two ways of running the application: development and production mode.
### 1. Development
Run both of the backend and frontend separately

#### - Bakcend

If you want to start the API

```bash
    cd api
    yarn
    yarn start
```

In terms of stack, we are using : Express, NodeJS and MongoDB

#### -Frontend

If you want to start the Frontend

```bash
    cd front
    yarn
    yarn start
```
This command will start the development server and open the app on the browser for you.

In terms of stack, we are using : ReactJS, started from a template available [here](https://github.com/BPouncey/ReactJS-ecommerce-template) 

### 2. Production
To run the app in production mode, we need to build the frontend app first and run then, run the backend only.
#### - Build the frontend
For yarn
```bash
    cd front
    yarn build
```
For npm
```bash
    cd front
    npm run build
```

#### - Run the backend

```bash
    cd api
    yarn start
```

You should see messages on the terminal: ``DB connected successfully`` and ``Running Application on port 4101`` 
#### - Access the app
Open [http://localhost:4101](http://localhost:4101) on your browser. 