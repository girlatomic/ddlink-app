# WELCOME TO DDlink

DDLink is a web application for freelance designers and developers to post and or search for work projects of interest.

Borrowing from the dating app format of swipe and like, DDLink allows for designers and developers to connect with each other based on projects of interest and skills. It makes the search for work interactive, social and without information overload.

## App

![home](/public/images/DD-LINK.jpg)

## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called emanager: `create database ddlink`
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=YOURUSER
  DB_NAME=emanager
  DB_PASS=YOURPASSWORD
```

- Run `npm run migrate` in the project folder of this repository, in a new terminal window.

### Development

- Run `npm start` in project directory to start the Express server on port 5000
- In another terminal, do `cd client` and run `npm start` to start the client in development mode with hot reloading in port 3000.

## Acknowledgements

_This is a student project that was created at [CodeOp](http://CodeOp.tech), a full stack development bootcamp in Barcelona._
