// app.js

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api', (req, res) => {
  const { slack_name, track } = req.query;

  // Ensure slack_name and track parameters are provided
  if (!slack_name || !track) {
    return res.status(400).json({ error: 'slack_name and track parameters are required' });
  }

  // Get the current day of the week
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = daysOfWeek[new Date().getDay()];

  // Get the current UTC time within a +/-2 minute window
  const now = new Date();
  const utcTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString();

  // Define the response JSON
  const response = {
    slack_name,
    current_day: currentDay,
    utc_time: utcTime,
    track,
    github_file_url: 'https://github.com/username/repo/blob/main/file_name.ext',
    github_repo_url: 'https://github.com/ingchrist/zuri-internship.git',
    status_code: 200,
  };

  // Send the JSON response
  res.json(response);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
