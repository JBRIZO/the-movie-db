export interface IGetSessionId {
  success: boolean;
  session_id: string;
}

export interface ISessionIdFailure {
  status_message: string;
  status_code: number;
  success?: boolean;
}
