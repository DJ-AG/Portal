/* Extends the express library's Request interface by adding a new property */
declare namespace Express {
    interface Request {
        user?: import('./models/user').IUser;
    }
  }