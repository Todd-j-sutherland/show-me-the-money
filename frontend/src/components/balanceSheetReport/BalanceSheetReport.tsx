import React, { useEffect, useState } from "react";
import { Cell, Row, Report, Reports } from "./types/balance-sheet-report";

const BalanceSheetReport: React.FC = () => {
  const [report, setReport] = useState<Report | null>(null);

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
    }
  };

  const renderHeaderRow = (cells: Cell[], index: number) => (
    <tr key={index}>
      {cells.map((cell, cellIndex) => (
        <th key={cellIndex}>{cell.Value}</th>
      ))}
    </tr>
  );

  const renderSectionRow = (title: string | undefined, index: number) => (
    <tr key={index}>
      <th colSpan={3}>{title}</th>
    </tr>
  );

  const renderDataRow = (cells: Cell[], index: number) => (
    <tr key={index}>
      {cells.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell.Value}</td>
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

  if (!report) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-4">{report.ReportName}</h1>
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              {report.ReportTitles.map((title, index) => (
                <th
                  key={index}
                  colSpan={3}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {renderRows(report.Rows)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BalanceSheetReport;
