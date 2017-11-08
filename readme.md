# Server Health Services

Note: THIS PROJECT IS IN ALPHA PHASE --Please ignore the mess

Notes: 
* You MUST start this script on the server where the /var/log folder is 
located
* Minimum Node version is 6.0 for using keywords const and let as well as ES6 arrow functions
* Script must be run as root until permissions are more eleganty handled

## Configuring the logs to be watched
To configure the logs to watch. In the config file under exports.logLocations
fill an array like so:
```

//Append any desired logFiles to tail to this array
exports.logLocations = ['/var/log/secure', '/var/log/cron', ...];

```

## configuring config-template.js
Before you can run this script on your server you must rename config-template.js to config.js
and fill in the info. See the example below:

```

exports.gmailSender = 'bot@emailService.com';
exports.gmailPassword = 'botPassword';
exports.gmailReceiver = 'bser@gmaemailService.com';
exports.logLocationsArray = ['/var/log/secure', '/var/log/messages'];

```