import moment from "moment";

export const formatT = val => {
  return moment(val).format("YYYY-MM-DD HH:mm:ss");
};
