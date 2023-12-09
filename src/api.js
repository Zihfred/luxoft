import axios from "axios";

export const getAllUsers = () =>
  axios({
    method: "get",
    url: "https://alpha.deadalice.xyz:4000/api/users",
  }).then((res) => res.data.users);

export const getAllRegions = () =>
  axios({ method: "get", url: "https://alpha.deadalice.xyz:4000/api/regions" }).then(
    (res) => res.data.regions
  );

export const createSegment = (data) => {
  axios({
    method: 'post',
    url: "https://alpha.deadalice.xyz:4000/api/segments",
    data
  })
}
 