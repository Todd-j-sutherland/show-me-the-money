import { Reports } from "../../types/balance-sheet-report";

const API_URL = "http://localhost:4001/api/v1";

export const fetchBalanceSheetReports = async (): Promise<Reports> => {
  try {
    const response = await fetch(`${API_URL}/balance-sheet`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Reports = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching balance sheet:", error);
    throw error;
  }
};
