const fs = require('fs');
const { spawn } = require('node:child_process');
const { resolve } = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cron = require('cron');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// API endpoint to register a new customer
app.post('/customer/register', (req, res) => {
  const { name, email, birthday } = req.body;

  //create fault taularent data, db implementation should be great
  //if customers.json file already not implemented, create one
  fs.readFile('customers.json', (err, data) => {
    if (err) {
      fs.writeFile(
        'customers.json',
        JSON.stringify([{ name, email, birthday }]),
        'utf-8',
        () => {
          return res
            .status(200)
            .json({ message: 'Customer registered successfully' });
        },
      );
    }
    //if customers.json file already implemented, update the file
    if (data) {
      const customers = JSON.parse(data);
      customers.push({ name, email, birthday });
      fs.writeFile('customers.json', JSON.stringify(customers), 'utf-8', () => {
        res.status(200).json({ message: 'Customer registered successfully' });
      });
    }
  });
});

// Schedule to check birthdays and send emails every day at midnight
const job = new cron.CronJob('0 0 * * *', () => {
  const node = spawn('node', ['sendEmail.js', resolve('customers.json')]);

  node.stderr.on('data', (data) => {
    //keep log on error
    console.error(`stderr: ${data}`);
  });

  node.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
});
job.start();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
