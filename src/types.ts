interface ITask {
  Id: string;
  Title: string;
  Description: string;
  Status: string;
  DueDate: string;
  CreatedDate: string;
}
interface IUser {
  Email: string;
}
export interface IUserState {
  IsAuthenticated: boolean;
  User: IUser;
}
export interface ITaskState {
  Tasks: ITask[];
  Refresh: boolean;
}
export interface ICommonState {
  Loading: boolean;
}
export interface ISnackbar {
  open: boolean;
  message: string;
  severity: any;
}
export interface IRootReducerShape {
  User: IUserState;
  Task: ITaskState;
  Common: ICommonState;
  Snackbar: ISnackbar;
}
