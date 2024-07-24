import { Request, Response } from "express";
import { getBalanceSheet } from "../services/balanceSheetService";
import { Reports } from "../types";

export const fetchBalanceSheet = async (req: Request, res: Response) => {
  try {
    const data: Reports = await getBalanceSheet();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching balance sheet" });
  }
};
