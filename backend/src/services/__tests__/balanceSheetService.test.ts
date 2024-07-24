import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getBalanceSheet } from "../balanceSheetService";
import { MOCK_API_HOST } from "../../config/constants";

describe("service: balanceSheetService", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it("fetch balance sheet data", async () => {
    const mockData = { balanceSheet: "dummyData" };
    mock
      .onGet(`${MOCK_API_HOST}/api.xro/2.0/Reports/BalanceSheet`)
      .reply(200, mockData);

    const result = await getBalanceSheet();
    expect(result).toEqual(mockData);
  });

  it("throw an error failing API call", async () => {
    mock.onGet(`${MOCK_API_HOST}/api.xro/2.0/Reports/BalanceSheet`).reply(500);

    await expect(getBalanceSheet()).rejects.toThrow();
  });
});
