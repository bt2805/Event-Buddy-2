// server/index.js

const express = require('express');
const app = express();
const fs = require('fs').promises;
const path = require('node:path');
const { exec } = require('child_process');
const https = require('https');

//Middleware
app.use(express.json());
//app.use(express.static('public'));
app.use(require('cors')());

const PORT = 3001;

// Endpoint to run Python script, await completion, and serve JSON data
app.get('/api', async (req, res) => {
  try {
    // Run the Python script
    await new Promise((resolve, reject) => {
      exec('python3 server/eventbrite.py', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing Python script: ${error}`);
          reject(error);
        }
        console.log(`Python script output: ${stdout}`);
        if (stderr) console.error(`Python script stderr: ${stderr}`);
        resolve();
      });
    });

    // Read the JSON file created by the Python script
    const dataPath = path.join(__dirname, 'events_data.json');
    const eventsData = await fs.readFile(dataPath, 'utf-8');

    // Send the data in response
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(eventsData);
    console.log('Sent events data from events_data.json');
  } catch (error) {
    console.error("Error processing API request:", error);
    res.status(500).send({ error: "Error processing events data" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});