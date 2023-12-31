import { ICat } from "../interfaces/cat";

export const showError = (error: string, email?: string) => {
  if (error.indexOf("invalid-credential") >= 0) {
    return "Invalid username or password";
  } else if (error.indexOf("wrong-password") >= 0) {
    return "Incorrect password";
  } else if (error.indexOf("invalid-email") >= 0) {
    return `${email} is an invalid email`;
  } else if (error.indexOf("email-already-in-use") >= 0) {
    return "Email address is already registered";
  } else if (error.indexOf("user-not-found") >= 0) {
    return `User ${email} wasn't found`;
  } else {
    return error;
  }
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
export const formatDate = (date: Date, years?: number, months?: number) => {
  if (years) {
    date.setFullYear(date.getFullYear() + years);
  }
  if (months) {
    date.setMonth(date.getMonth() + months);
  }

  return date.toISOString().split("T")[0];
};
export const sortByParam = (param: string, cats: ICat[], ascending = true) => {
  window.localStorage.setItem(
    "searchParam",
    JSON.stringify({ param, ascending })
  );
  let sorted;
  if (param === "birthdate") {
    sorted = cats.sort((a: ICat, b: ICat) => {
      if (!ascending) {
        return b!.birthdate!.seconds - a!.birthdate?.seconds;
      } else {
        return a!.birthdate!.seconds - b!.birthdate?.seconds;
      }
    });
  } else if (param === "name") {
    sorted = cats.sort((a: ICat, b: ICat) => {
      if (a.name && b.name) {
        if (!ascending) {
          return b!.name!.localeCompare(a!.name!, undefined, {
            numeric: true,
            sensitivity: "base",
          });
        } else {
          return a!.name!.localeCompare(b!.name!, undefined, {
            numeric: true,
            sensitivity: "base",
          });
        }
      } else {
        b.name = b.name ? b.name : "";
        a.name = a.name ? a.name : "";
        if (!ascending) {
          return b!.name!.localeCompare(a!.name!, undefined, {
            numeric: true,
            sensitivity: "base",
          });
        } else {
          return a!.name!.localeCompare(b!.name!, undefined, {
            numeric: true,
            sensitivity: "base",
          });
        }
      }
    });
  } else if (param === "ownerName") {
    sorted = cats.sort((a: ICat, b: ICat) => {
      if (a.ownerName && b.ownerName) {
        if (!ascending) {
          return b!.ownerName!.localeCompare(a!.ownerName!, undefined, {
            numeric: true,
            sensitivity: "base",
          });
        } else {
          return a!.ownerName!.localeCompare(b!.ownerName!, undefined, {
            numeric: true,
            sensitivity: "base",
          });
        }
      } else {
        b.ownerName = b.ownerName ? b.ownerName : "";
        a.ownerName = a.ownerName ? a.ownerName : "";
        if (!ascending) {
          return b!.ownerName!.localeCompare(a!.ownerName!, undefined, {
            numeric: true,
            sensitivity: "base",
          });
        } else {
          return a!.ownerName!.localeCompare(b!.ownerName!, undefined, {
            numeric: true,
            sensitivity: "base",
          });
        }
      }
    });
  } else if (param === "gender") {
    sorted = cats.sort((a: ICat, b: ICat) => {
      if (a.gender && b.gender) {
        if (!ascending) {
          return b!.gender!.localeCompare(a!.gender!, undefined, {
            numeric: true,
            sensitivity: "base",
          });
        } else {
          return a!.gender!.localeCompare(b!.gender!, undefined, {
            numeric: true,
            sensitivity: "base",
          });
        }
      } else {
        b.gender = b.gender ? b.gender : "";
        a.name = a.gender ? a.gender : "";
        if (!ascending) {
          return b!.gender!.localeCompare(a!.gender!, undefined, {
            numeric: true,
            sensitivity: "base",
          });
        } else {
          return a!.gender!.localeCompare(b!.gender!, undefined, {
            numeric: true,
            sensitivity: "base",
          });
        }
      }
    });
  } else if (param === "dewormed") {
    sorted = cats.sort((a: ICat, b: ICat) => {
      if (!ascending) {
        return a.dewormed === b.dewormed ? 0 : b.dewormed ? -1 : 1;
      } else {
        return a.dewormed === b.dewormed ? 0 : a.dewormed ? -1 : 1;
      }
    });
  } else if (param === "vaccinated") {
    sorted = cats.sort((a: ICat, b: ICat) => {
      if (!ascending) {
        return a.vaccinated === b.vaccinated ? 0 : b.vaccinated ? -1 : 1;
      } else {
        return a.vaccinated === b.vaccinated ? 0 : a.vaccinated ? -1 : 1;
      }
    });
  } else if (param === "sterilized") {
    sorted = cats.sort((a: ICat, b: ICat) => {
      if (!ascending) {
        return a.sterilized === b.sterilized ? 0 : b.sterilized ? -1 : 1;
      } else {
        return a.sterilized === b.sterilized ? 0 : a.sterilized ? -1 : 1;
      }
    });
  } else {
    sorted = cats;
  }
  return [...sorted];
};
