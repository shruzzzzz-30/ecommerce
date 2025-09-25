export interface IRegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface ILoginForm {
  email: string;
  password: string;
}
///if error occurs, return this

export interface IAuthResponse {
  message: string;
  error: {details: IErrorDetails}[];
}
//feild of error details
interface IErrorDetails {
  location: string;
  msg: string;
  path: string;
  type: string;
  value: string;
}

