import axios from "axios";

export const getAllUsers = () =>
  axios({
    method: "get",
    url: "http://localhost:4000/api/users",
  }).then((res) => res.data.users);
