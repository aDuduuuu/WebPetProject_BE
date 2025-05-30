// Import necessary modules
import { CronJob } from 'cron';
import https from 'https';

// Define the backend URL
const backendUrl = 'https://new-be-71aa.onrender.com/api/spas';

// Create a cron job to run every 14 seconds
const job = new CronJob('*/14 * * * *', function () {
  // This function will be executed every 14 seconds.
  console.log('Restarting server...');

  // Perform an HTTPS GET request to hit any backend API.
  https
    .get(backendUrl, (res) => {
      if (res.statusCode === 200) {
        console.log('Server restarted');
      } else {
        console.error(`Failed to restart server with status code: ${res.statusCode}`);
      }
    })
    .on('error', (err) => {
      console.error('Error during Restart:', err.message);
    });
});

// Export the cron job as a named export
export { job };