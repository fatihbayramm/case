import { generatePath as generatePathOriginal } from "react-router-dom";

export const routes = {
  HOME: "/",
  DETAIL: "/user/:id",
  NEW_USER: "/new-user",
};

export const generatePath = (path, params) => {
  return generatePathOriginal(path, params);
};
