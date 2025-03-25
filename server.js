import express from 'express';
import fs from 'fs';
import { parse } from 'json2csv';
import path from 'path';
import cors from 'cors';


//According to ChatGPT, this will resolve issues with dirname. required to write to a local csv

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
const port = 3000;

// Use the CORS middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON data from the request body
app.use(express.json());  // Use Express's built-in JSON parser

// Function to write data to CSV
const writeToCSV = (data, filePath) => {
  try {
    const csv = parse(data, { header: false }); // No headers each time
    fs.appendFile(filePath, csv + '\n', (err) => {
      if (err) {
        console.error("Error appending to file:", err);
      } else {
        console.log("Data successfully appended to", filePath);
      }
    });
  } catch (error) {
    console.error("Error converting to CSV:", error);
  }
};


// Route to handle storing data
app.post('/store-data', (req, res) => {
  const { today, workHours, gameHours, workingOut } = req.body;

  // Make sure the data is valid
  if (!workHours || !gameHours || typeof workingOut !== 'boolean') {
    return res.status(400).json({ error: 'Invalid data' });
  }

  const data = [{
    workHours: workHours,
    gameHours: gameHours,
    workingOut: workingOut,
    today: today
  }];

  const filePath = path.join(__dirname, 'accountableData.csv'); // Path to store the CSV file
  writeToCSV(data, filePath);

  res.status(200).json({ message: 'Data stored successfully!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
