import express from "express";
import { fetchBalanceSheet } from "../controllers/balanceSheetController";

const router = express.Router();

router.get("/balance-sheet", fetchBalanceSheet);

export default router;
