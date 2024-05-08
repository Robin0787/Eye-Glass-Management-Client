/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import { TIssue } from "../types";

const handleAPIRequest = async (
  apiCall: any,
  data: any,
  toastId?: string,
  navigateFn?: any,
  navigateTo?: string
) => {
  try {
    const res = await apiCall(data).unwrap();
    console.log("----Response----");
    console.log(res);
    if (res.success) {
      toast.success(res.message || "Successful", {
        id: toastId,
      });
      if (navigateTo) {
        navigateFn(navigateTo || "");
      }
    }
    return true;
  } catch (error: any) {
    console.log("----Error----");
    console.log(error);
    const errorSources = error?.data?.errorSources;
    if (errorSources.length > 0) {
      errorSources.map((issue: TIssue) =>
        toast.error(issue?.message || "Something went wrong", { id: toastId })
      );
    } else {
      toast.error(error?.message || "Something went wrong", { id: toastId });
    }
    return false;
  }
};

export default handleAPIRequest;
