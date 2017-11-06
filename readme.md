#Server Health Services

Note: THIS PROJECT IS IN ALPHA PHASE --Please ignore the mess

Note: you MUST start this script on the server where the /var/log folder is 
located

##Configuring the logs to be watched
To configure the logs to watch. In the script's folder include a file named 
"logList.txt" with each log file name to be followed on a new like like so:

###logList.txt:

```
/var/log/demsg
/var/log/secure
...
```