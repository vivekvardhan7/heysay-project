const moment = require('moment-timezone');

// Date Route
app.get("/date", (req, res) => {
  try {
    const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
    const istTime = moment.tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
    const usTime = moment.tz("America/New_York").format("YYYY-MM-DD HH:mm:ss");
    const ukTime = moment.tz("Europe/London").format("YYYY-MM-DD HH:mm:ss");
    const ausTime = moment.tz("Australia/Sydney").format("YYYY-MM-DD HH:mm:ss");

    // Sending a response with all the time zones formatted
    res.json({
      currentTime,
      istTime,
      usTime,
      ukTime,
      ausTime
    });
  } catch (error) {
    console.error('Error fetching time data:', error);
    res.status(500).json({ error: 'Failed to load time data.' });
  }
});
