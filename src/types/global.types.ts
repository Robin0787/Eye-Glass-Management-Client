export type TUserRole = "user" | "manager";

export type TIssue = {
  path: string;
  message: string;
};

export type TError = {
  data: {
    success: boolean;
    message: string;
    stack: string;
    errorSources: TIssue[];
  };
  status: number;
};
