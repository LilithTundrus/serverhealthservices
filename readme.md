# Server Health Services

Note: THIS PROJECT IS IN ALPHA PHASE --Please ignore the mess

Note: you MUST start this script on the server where the /var/log folder is 
located

## Configuring the logs to be watched
To configure the logs to watch. In the config file under exports.logLocations
fill an array like so:
```
...
exports.logLocations = ['/var/log/secure', '/var/log/cron']
...
```