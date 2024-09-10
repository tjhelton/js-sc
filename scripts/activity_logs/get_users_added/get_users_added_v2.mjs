// import { writeFile } from 'fs/promises';
// import axios from 'axios'


// const token = process.argv[2]

//   // let nextPage = '/feed/activity_log_events';
//   const options = {
//     headers: {
//       authorization: 'Bearer ' + token
//     }
//   };

// let logs = []

// const data = await axios.get('https://api.safetyculture.io/feed/activity_log_events',options)

// async function getActivityLogs(baseUrl) {
//   let nextPage = '/feed/activity_log_events';
//   const headers = {
//     Authorization: 'Bearer ' + token
//   };

//   let logs = [];

//   while (nextPage) {
//     try {
//       const response = await fetch(`${baseUrl}${nextPage}`, {
//         method: 'GET',
//         headers: headers,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();

//       data.data.forEach(event => {
//         if (event.type === 'org.users_added') {logs.push({
//           event_at: event.event_at,
//           added: event.metadata.split('"added_user_ids":"')[1].split('"')[0],
//           user_id: event.user_id,
//           type: event.type,
//         });
//       }});


//       const metadata = data.metadata;
//       nextPage = metadata.next_page || null;

//     } catch (error) {
//       console.error('Error fetching data:', error.message);
//       break;
//     }
//   }

//   const logFilePath = 'event_logs.json';
//   try {
//     await writeFile(logFilePath, JSON.stringify(logs, null, 2));
//     console.log(`Logs successfully written to ${logFilePath}`);
//   } catch (err) {
//     console.error('Error writing to file:', err.message);
//   }
// }

// getActivityLogs('https://api.safetyculture.io');
