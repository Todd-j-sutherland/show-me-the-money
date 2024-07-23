import React, { useEffect, useState } from "react";
import { Cell, Row, Report, Reports } from "./types/balance-sheet-report";

const BalanceSheetReport: React.FC = () => {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBalanceSheetReports();
  }, []);

  const fetchBalanceSheetReports = async () => {
    try {
      const response = await fetch(
        "http://localhost:4001/api/v1/balance-sheet"
      );
      const data: Reports = await response.json();
      const reportData = data.Reports[0];
      setReport(reportData);
    } catch (err) {
      console.error("Error fetching:", err);
      setError("Error fetching balance sheet data");
    } finally {
      setLoading(false);
    }
  };

  const renderHeaderRow = (cells: Cell[], index: number) => (
    <tr key={index}>
      {cells.map((cell, cellIndex) => (
        <th
          key={cellIndex}
          className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider font-heading"
        >
          {cell.Value}
        </th>
      ))}
    </tr>
  );

  const renderSectionRow = (title: string | undefined, index: number) => (
    <tr key={index}>
      <th
        colSpan={3}
        className="px-6 py-3 text-left text-sm font-medium text-primary uppercase tracking-wider bg-background font-heading"
      >
        {title}
      </th>
    </tr>
  );

  const renderDataRow = (cells: Cell[], index: number) => (
    <tr key={index}>
      {cells.map((cell, cellIndex) => (
        <td
          key={cellIndex}
          className="px-6 py-4 whitespace-nowrap text-text font-body"
        >
          {cell.Value}
        </td>
      ))}
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
              {renderSectionRow(row.Title, index)}
              {renderRows(row.Rows || [])}
            </React.Fragment>
          );
        case "SummaryRow":
        case "Row":
          return renderDataRow(row.Cells, index);
        default:
          return null;
      }
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (error)
    return <div className="text-accent text-center font-body">{error}</div>;
  if (!report) return null;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-background">
      <h1 className="text-3xl font-bold mb-4 text-heading font-heading">
        {report.ReportName}
      </h1>
      <div className="shadow overflow-hidden border border-border sm:rounded-lg">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-background">
            <tr>
              {report.ReportTitles.map((title, index) => (
                <th
                  key={index}
                  colSpan={3}
                  className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider font-heading"
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
  );
};

export default BalanceSheetReport;
