import axios from "axios";
import { MOCK_API_HOST } from "../config/constants";

export const getBalanceSheet = async () => {
  const response = await axios.get(
    `${MOCK_API_HOST}/api.xro/2.0/Reports/BalanceSheet`
  );
  return response.data;
};
