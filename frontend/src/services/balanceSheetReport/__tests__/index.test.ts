import fetchMock from "jest-fetch-mock";
import { fetchBalanceSheetReports, API_URL } from "../index";
import mockDataReports from "../../../assets/data.json";

fetchMock.enableMocks();

describe("service: fetchBalanceSheetReports", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("API: fetch balance sheet reports successfully", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockDataReports));

    const result = await fetchBalanceSheetReports();

    expect(result).toEqual(mockDataReports);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/api/v1/balance-sheet`);
  });

  test("API: throw an error when the fetch fails", async () => {
    fetchMock.mockRejectOnce(new Error("Network error"));

    await expect(fetchBalanceSheetReports()).rejects.toThrow("Network error");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/api/v1/balance-sheet`);
  });

  test("API: throw an error when the response fails", async () => {
    fetchMock.mockResponseOnce("", { status: 404 });

    await expect(fetchBalanceSheetReports()).rejects.toThrow(
      "HTTP error! status: 404"
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(`${API_URL}/api/v1/balance-sheet`);
  });
});
