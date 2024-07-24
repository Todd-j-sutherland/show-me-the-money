import { Request, Response } from "express";
import { fetchBalanceSheet } from "../balanceSheetController";
import * as balanceSheetService from "../../services/balanceSheetService";

jest.mock("../../services/balanceSheetService");

describe("balanceSheetController", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnThis();
    mockRequest = {};
    mockResponse = {
      json: mockJson,
      status: mockStatus,
    };
  });

  it("should return balance sheet data on successful fetch", async () => {
    const mockData = { balanceSheet: "data" };
    (balanceSheetService.getBalanceSheet as jest.Mock).mockResolvedValue(
      mockData
    );

    await fetchBalanceSheet(mockRequest as Request, mockResponse as Response);

    expect(mockJson).toHaveBeenCalledWith(mockData);
    expect(mockStatus).not.toHaveBeenCalled();
  });

  it("should return 500 status on error", async () => {
    (balanceSheetService.getBalanceSheet as jest.Mock).mockRejectedValue(
      new Error("Test error")
    );

    await fetchBalanceSheet(mockRequest as Request, mockResponse as Response);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({
      error: "Error fetching balance sheet",
    });
  });
});
