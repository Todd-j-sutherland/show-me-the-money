import express from "express";
import cors from "cors";
import { PORT } from "./config/constants";
import balanceSheetRoutes from "./routes/balanceSheetRoutes";

const app = express();

app.use(cors());
app.use("/api/v1", balanceSheetRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
