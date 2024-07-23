import React, { useEffect, useState } from "react";
import { Cell, Row, Report, Reports } from "../../types/balance-sheet-report";
import { fetchBalanceSheetReports } from "../../services/balanceSheetReport";
import LoadingSpinner from "../shared/Loading.Spinner";
import Toast from "../shared/Toast";

const BalanceSheetReport: React.FC = () => {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getBalanceSheet = async () => {
      setLoading(true);
      try {
        const data: Reports = await fetchBalanceSheetReports();
        setReport(data.Reports[0]);
      } catch (err) {
        setError("Error fetching balance sheet data");
      } finally {
        setLoading(false);
      }
    };

    getBalanceSheet();
  }, []);

  const renderHeaderRow = (cells: Cell[], index: number) => (
    <tr key={index} className="bg-primary bg-opacity-10">
      {cells.map((cell, cellIndex) => (
        <th
          key={cellIndex}
          className="px-4 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider font-heading border-b border-border"
        >
          {cell.Value}
        </th>
      ))}
    </tr>
  );

  const renderSectionRow = (
    title: string | undefined,
    index: number,
    hasTotal: boolean = false
  ) => (
    <tr
      key={index}
      className={hasTotal ? "bg-secondary bg-opacity-10 font-bold" : ""}
    >
      <th
        colSpan={3}
        className="px-4 py-3 text-left text-sm font-bold text-primary uppercase tracking-wider bg-background font-heading border-b border-border"
      >
        {title}
      </th>
    </tr>
  );

  const renderDataRow = (
    cells: Cell[],
    index: number,
    hasTotal: boolean = false
  ) => (
    <tr
      key={index}
      className={`${hasTotal ? "bg-secondary bg-opacity-10 font-bold" : ""} ${
        index % 2 === 0 ? "bg-gray-50" : ""
      }`}
    >
      {cells.map((cell, cellIndex) => {
        console.log(cell.Value);
        const value = parseFloat(cell.Value);
        const isNegative = value < 0;

        return (
          <td
            key={cellIndex}
            className={`px-4 py-3 whitespace-nowrap text-sm font-body border-b border-border ${
              cellIndex > 0 ? "text-left" : ""
            } ${isNegative ? "text-red-500" : ""}`}
          >
            {cell.Value}
          </td>
        );
      })}
    </tr>
  );

  const renderRows = (rows: Row[]) => {
    return rows.map((row, index) => {
      switch (row.RowType) {
        case "Header":
          return renderHeaderRow(row.Cells, index);
        case "Section":
          return (
            <React.Fragment key={index}>
              {renderSectionRow(
                row.Title,
                index,
                row.Rows?.some((row) => row.RowType === "SummaryRow")
              )}
              {renderRows(row.Rows || [])}
            </React.Fragment>
          );
        case "SummaryRow":
          return renderDataRow(row.Cells, index, true);
        case "Row":
          return renderDataRow(row.Cells, index);
        default:
          return null;
      }
    });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Toast isError={true} message={error} />;
  if (!report) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-background">
      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-heading font-heading">
            {report.ReportName}
          </h1>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-primary">
            {report.ReportTitles[0]}
          </p>
          <p className="text-sm text-secondary mt-1">{report.ReportDate}</p>
        </div>
      </div>

      <div className="shadow-lg overflow-hidden border border-border sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-background">
              <tr>
                {report.ReportTitles.slice(1).map((title, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 text-left text-sm font-medium text-secondary uppercase tracking-wider font-heading border-b border-border whitespace-nowrap"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-border">
              {renderRows(report.Rows)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BalanceSheetReport;
