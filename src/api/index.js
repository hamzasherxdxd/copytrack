import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// API.interceptors.request.use((req) => {
//   console.log(localStorage.getItem("user_info"));
//   if (localStorage.getItem("user_info")) {
//     req.headers.Authorization = `Bearer ${JSON.parse(
//       localStorage.getItem("user_info").token
//     )}`;
//   }
// console.log(req);

//   return req;
// });

export const signIn = (data) => {
  API.post("/api/login", data);
};
export const signInGoogle = (accessToken) => {
  console.log(accessToken);
  API.post("/api/login", {
    googleAccessToken: accessToken,
  });
};

export const signUp = (data) => API.post("/api/register", data);
export const signUpGoogle = (accessToken) =>
  API.post("/api/register", {
    googleAccessToken: accessToken,
  });
