import axios from "axios";
import { LOCAL_HOST } from "../config/constants";

export const getBalanceSheet = async () => {
  const response = await axios.get(
    `${LOCAL_HOST}/api.xro/2.0/Reports/BalanceSheet`
  );
  return response.data;
};
