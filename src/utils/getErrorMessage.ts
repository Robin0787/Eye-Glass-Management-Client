/* eslint-disable @typescript-eslint/no-explicit-any */

const getErrorMessage = (errors: any) => {
  for (const err in errors) {
    return `${err} is required`;
  }
};

export default getErrorMessage;
