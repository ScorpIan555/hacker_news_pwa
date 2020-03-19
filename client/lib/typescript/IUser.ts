export interface IUser {
  id?: number; // optional for development, in production, prefer to pull the email & id from the payload
  email: string;
  password?: string; // shouldn't be required b/c don't wanna pass this around client state
  type?: string;
}
