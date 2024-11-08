import winston from 'winston';

const logger = winston.createLogger({
  level:'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({
      filename: 'users_changes.log',
      level: 'info'
  }),
  ],
});

const activityTypes = ['org.users_added','org.user_removed','org.users_deactivated','org.user_activated']

const token = process.argv[2]
const rootUrl = 'https://api.safetyculture.io'
const options = {
    method: 'GET',
    headers: {accept: 'application/json', authorization: 'Bearer ' + token}
  };

async function getLogs() {
    let appendUrl = '/feed/activity_log_events'

    while(appendUrl !== null){
        const response = await fetch(rootUrl+appendUrl,options)
        const jsonData = await response.json()
        for(const item of jsonData.data){
            if(activityTypes.includes(item.type)){
                logger.log('info', `${item.type}:${item.event_at}:${item.user_id}`)
        };
        appendUrl = jsonData.metadata.next_page
    };
}}

getLogs()
