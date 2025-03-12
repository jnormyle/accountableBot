import express from 'express';
import fs from 'fs';
import { parse } from 'json2csv';
import path from 'path';
import cors from 'cors';

const app = express();
const port = 3000;

// Use the CORS middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON data from the request body
app.use(express.json());  // Use Express's built-in JSON parser

// Function to write data to CSV
const writeToCSV = (data, filePath) => {
  try {
    const csv = parse(data);  // Convert the data to CSV format
    const csvOptions = { flag: 'a' };  // Append to the file if it exists

    // Write CSV to the specified file
    fs.writeFile(filePath, csv + '\n', csvOptions, (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log("Data successfully written to", filePath);
      }
    });
  } catch (error) {
    console.error("Error converting to CSV:", error);
  }
};

// Route to handle storing data
app.post('/store-data', (req, res) => {
  const { workHours, gameHours, workingOut } = req.body;

  // Make sure the data is valid
  if (!workHours || !gameHours || typeof workingOut !== 'boolean') {
    return res.status(400).json({ error: 'Invalid data' });
  }

  const data = [{
    workHours: workHours,
    gameHours: gameHours,
    workingOut: workingOut
  }];

  const filePath = path.join(__dirname, 'accountableData.csv'); // Path to store the CSV file
  writeToCSV(data, filePath);

  res.status(200).json({ message: 'Data stored successfully!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
