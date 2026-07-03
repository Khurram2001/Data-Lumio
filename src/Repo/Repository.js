import axios from "axios";

// export const baseURL = "https://api.mawesh.com/";
// export const baseURL = "http://datalumio.us-west-2.elasticbeanstalk.com/";
export const baseURL = "https://api.urhja.com";

export const proMonthlyLookupKey = "lumio-pro-monthly";
export const proYearlyLookupKey = "lumio-pro-yearly";
export const starterMonthlyLookupKey = "lumio-starter";
export const starterYearlyLookupKey = "lumio-starter";

const Repository = axios.create({
  baseURL,
  headers: {
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

export default Repository;
