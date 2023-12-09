import axios from "axios";

export const getAllUsers = () =>
  axios({
    method: "get",
    url: "http://176.104.33.192:4000/api/users",
  }).then((res) => res.data.users);
