export type Cell = {
  Value: string;
  Attributes?: { Value: string; Id: string }[];
};

export type Row = {
  RowType: string;
  Title?: string;
  Cells: Cell[];
  Rows?: Row[];
};

export type Report = {
  ReportID: string;
  ReportName: string;
  ReportType: string;
  ReportTitles: string[];
  ReportDate: string;
  UpdatedDateUTC: string;
  Fields: any[];
  Rows: Row[];
};

export type Reports = {
  Status: string;
  Reports: Report[];
};
