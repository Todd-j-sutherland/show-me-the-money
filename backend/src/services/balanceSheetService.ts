import axios from "axios";
import { MOCK_API_HOST } from "../config/constants";
import { Reports } from "../types";

export const getBalanceSheet = async (): Promise<Reports> => {
  const response = await axios.get(
    `${MOCK_API_HOST}/api.xro/2.0/Reports/BalanceSheet`
  );
  return response.data;
};
