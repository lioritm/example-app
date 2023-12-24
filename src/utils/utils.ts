export const showError = (error: string, email?: string) => {
  return error.indexOf("invalid-credential") > 0
    ? `Invalid username or password`
    : error.indexOf("wrong-password") > 0
    ? "Incorrect password"
    : error.indexOf("invalid-email") > 0
    ? `${email} is an invalid email`
    : "Unknown Error";
};
export const returnDate = (secs: number) => {
  const date = new Date(secs * 1000);
  const formattedDate = date
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .replace(/ /g, "-");

  return formattedDate;
};
