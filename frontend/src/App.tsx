import React from "react";
import "./App.css";
import MockData from "./data.json";

const App = () => {
  const { ReportName, ReportTitles, Rows } = MockData.Reports[0];

  const dataRow = (row: any, index: number) => {
    if (row.RowType === "Section") {
      return (
        <>
          <tr>
            <th colSpan={3}>{row.Title}</th>
          </tr>
          {row.Rows.map(dataRow)}
        </>
      );
    }
    return (
      <tr key={index}>
        {row.Cells.map((cell: any, cellIndex: number) => (
          <td key={cellIndex}>{cell.Value}</td>
        ))}
      </tr>
    );
  };

  return (
    <div>
      <h1>{ReportName}</h1>
      <table>
        <thead>
          <tr>
            {ReportTitles.map((title: string, index: number) => (
              <th key={index} colSpan={4}>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Rows.map((row: any, index: number) => dataRow(row, index))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
