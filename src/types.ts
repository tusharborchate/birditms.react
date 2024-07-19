export interface ITask {
  Id: string;
  Title: string;
  Description: string;
  Status: Status;
  DueDate: string;
  CreatedDate: string;
}

export enum Status {
  Open = 0,
  InProgress = 1,
  Completed = 2,
}
export interface IUser {
  Email: string;
}
export interface IUserState {
  IsAuthenticated: boolean;
  User: IUser;
}
export interface ITaskState {
  Tasks: ITask[];
  Refresh: boolean;
  Loading: boolean;
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
