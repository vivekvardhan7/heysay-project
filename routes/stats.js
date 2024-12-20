const express = require('express');
const router = express.Router();
const os = require('os');

// Stats Route
router.get('/stats', (req, res) => {
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

module.exports = router;
