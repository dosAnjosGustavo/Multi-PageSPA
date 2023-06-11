type ErrorResponse = {
  title?: string;
  description?: string;
  date?: string;
  image?: string;
};

type EventData = ErrorResponse & {
  id: string;
};
type User = {
  password: string;
  email: string;
  id: string;
};

type StoredData = {
  events: Array<EventData>;
  users: Array<User>;
};

declare namespace Express {
  export interface Request {
    token?: string | JwtPayload;
  }
}
