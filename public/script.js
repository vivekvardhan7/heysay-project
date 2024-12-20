// script.js
window.onload = function() {
    // Fetch and display time data from the server
    fetch('/date')  // Assuming this endpoint returns the time data
        .then(response => response.json())
        .then(data => {
            const timeElement = document.getElementById('time');
            timeElement.innerHTML = `
                <strong>Local Time:</strong> ${data.localTime} <br>
                <strong>IST Time:</strong> ${data.istTime} <br>
                <strong>New York Time:</strong> ${data.newYorkTime} <br>
                <strong>London Time:</strong> ${data.londonTime} <br>
                <strong>Sydney Time:</strong> ${data.sydneyTime} <br>
            `;
        })
        .catch(error => console.error('Error fetching time data:', error));

    // Fetch and display system stats from the server
    fetch('/stats')  // Assuming this endpoint returns system stats
        .then(response => response.json())
        .then(data => {
            const statsElement = document.getElementById('stats');
            statsElement.innerText = `
                Memory Usage: ${JSON.stringify(data.memoryUsage, null, 2)}
                CPU Usage: ${JSON.stringify(data.cpuUsage, null, 2)}
            `;
        })
        .catch(error => console.error('Error fetching system stats:', error));
};
