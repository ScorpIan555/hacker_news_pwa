export interface ILoginUser {
  id?: number; // optional for development, in production, prefer to pull the email & id from the payload
  email: string;
  password: string;
  type?: string;
}
