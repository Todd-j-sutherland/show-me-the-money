import request from "supertest";
import express from "express";
import balanceSheetRoutes from "../balanceSheetRoutes";
import * as balanceSheetController from "../../controllers/balanceSheetController";

jest.mock("../../controllers/balanceSheetController");

const app = express();
app.use("/api/v1", balanceSheetRoutes);

describe("balanceSheetRoutes", () => {
  it("should call fetchBalanceSheet controller when GET /balance-sheet is called", async () => {
    const mockFetchBalanceSheet =
      balanceSheetController.fetchBalanceSheet as jest.MockedFunction<
        typeof balanceSheetController.fetchBalanceSheet
      >;

    mockFetchBalanceSheet.mockImplementation(async (req, res) => {
      res.json({ message: "Mocked balance sheet" });
    });

    const response = await request(app).get("/api/v1/balance-sheet");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Mocked balance sheet" });
    expect(mockFetchBalanceSheet).toHaveBeenCalled();
  });
});
