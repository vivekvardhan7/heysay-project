const express = require("express");
const moment = require('moment-timezone');
const os = require("os");
const process = require("process");

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Home Route
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>HeySay Project</title></head>
      <body style="background-color: black; color: white; font-family: Arial, sans-serif;">
        <div style="text-align: center; padding-top: 100px;">
          <h1>Hello Nerds</h1>
        </div>
        <nav style="background-color: green; padding: 10px; text-align: center;">
          <a href="/" style="color: white; margin: 10px;">Home</a>
          <a href="/about" style="color: white; margin: 10px;">About Us</a>
          <a href="/contact" style="color: white; margin: 10px;">Contact</a>
        </nav>
      </body>
    </html>
  `);
});

// Date Route
app.get("/date", (req, res) => {
  const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
  const istTime = moment.tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  const usTime = moment.tz("America/New_York").format("YYYY-MM-DD HH:mm:ss");
  const ukTime = moment.tz("Europe/London").format("YYYY-MM-DD HH:mm:ss");
  const ausTime = moment.tz("Australia/Sydney").format("YYYY-MM-DD HH:mm:ss");

  res.json({
    currentTime,
    istTime,
    usTime,
    ukTime,
    ausTime
  });
});

// Stats Route
app.get("/stats", (req, res) => {
  const memoryUsage = process.memoryUsage();
  const cpuUsage = os.cpus();

  // Formatting memory usage (in MB)
  const formattedMemoryUsage = {
    rss: (memoryUsage.rss / 1024 / 1024).toFixed(2) + ' MB',
    heapTotal: (memoryUsage.heapTotal / 1024 / 1024).toFixed(2) + ' MB',
    heapUsed: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2) + ' MB',
    external: (memoryUsage.external / 1024 / 1024).toFixed(2) + ' MB'
  };

  // Formatting CPU usage
  const formattedCpuUsage = cpuUsage.map(cpu => ({
    model: cpu.model,
    speed: cpu.speed + ' MHz',
    times: {
      user: cpu.times.user + ' ms',
      nice: cpu.times.nice + ' ms',
      sys: cpu.times.sys + ' ms',
      idle: cpu.times.idle + ' ms',
      irq: cpu.times.irq + ' ms'
    }
  }));

  // Sending the formatted response
  res.json({
    memoryUsage: formattedMemoryUsage,
    cpuUsage: formattedCpuUsage
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
