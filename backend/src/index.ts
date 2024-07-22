import express from "express";
import axios from "axios";

const app = express();
const PORT = 4001;
const localHost = "http://localhost:3000";

app.get("/api/v1/balance-sheet", async (req, res) => {
  try {
    const response = await axios.get(
      `${localHost}/api.xro/2.0/Reports/BalanceSheet`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error in endpoint: /api/v1/balance-sheet" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
