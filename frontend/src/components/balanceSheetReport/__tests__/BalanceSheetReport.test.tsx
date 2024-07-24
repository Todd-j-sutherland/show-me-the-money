import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import BalanceSheetReport from "../BalanceSheetReport";
import { fetchBalanceSheetReports } from "../../../services/balanceSheetReport";
import mockDataReports from "../../../assets/data.json";

jest.mock("../../../services/balanceSheetReport");

describe("BalanceSheetReport Component", () => {
  beforeEach(() => {
    (fetchBalanceSheetReports as jest.Mock).mockResolvedValue(mockDataReports);
  });

  test("loading spinner initially", () => {
    render(<BalanceSheetReport />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  test("report data after loading", async () => {
    render(<BalanceSheetReport />);

    await waitFor(() => {
      expect(
        screen.getAllByRole("heading", { name: "Balance Sheet" })
      ).not.toHaveLength(0);
      expect(
        screen.getAllByText("Balance Sheet", { selector: "p" })
      ).not.toHaveLength(0);
      expect(screen.getAllByText("Demo Org")).not.toHaveLength(0);
      expect(screen.getAllByText("22 July 2024")).not.toHaveLength(0);
      expect(screen.getAllByText("Assets")).not.toHaveLength(0);
      expect(screen.getAllByText("My Bank Account")).not.toHaveLength(0);
      expect(screen.getAllByText("Total Bank")).not.toHaveLength(0);
    });
  });

  test("error toast on fetch error", async () => {
    (fetchBalanceSheetReports as jest.Mock).mockRejectedValue(
      new Error("Fetch error")
    );

    render(<BalanceSheetReport />);

    await waitFor(() => {
      expect(
        screen.getByText("Error fetching balance sheet data")
      ).toBeInTheDocument();
    });
  });

  test("negative values in red", async () => {
    const negativeReports = {
      ...mockDataReports,
      Reports: [
        {
          ...mockDataReports.Reports[0],
          Rows: [
            ...mockDataReports.Reports[0].Rows,
            {
              RowType: "Row",
              Cells: [
                { Value: "Liabilities" },
                { Value: "-500" },
                { Value: "-250" },
              ],
            },
          ],
        },
      ],
    };

    (fetchBalanceSheetReports as jest.Mock).mockResolvedValue(negativeReports);

    render(<BalanceSheetReport />);

    await waitFor(() => {
      const negativeCell = screen.getByText("-500");
      expect(negativeCell).toHaveClass("text-red-500");
    });
  });
});
