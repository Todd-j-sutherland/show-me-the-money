import { Request, Response } from "express";
import { getBalanceSheet } from "../services/balanceSheetService";

export const fetchBalanceSheet = async (req: Request, res: Response) => {
  try {
    const data = await getBalanceSheet();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching balance sheet" });
  }
};
