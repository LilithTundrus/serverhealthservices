//Linux log / email /health graph here

'use strict';
const fs = require('fs');                                               //fs will be used to read system files
const config = require('./config');                                     //config file for script (file locations)
var isRoot = require('./lib/isRootCheck.js');                           //check if process is being run as root
var util = require('util');                                             //for using child-process-promise
var exec = require('child-process-promise').exec;                       //promise-wrapped shell command execution
var nodemailer = require('nodemailer');                                 //for sending emails
const ver = config.ver;                                                 //script version for debugging on deployments

//check if run as sudo for access to specific logs


//detect which Linux OS: *bian or Arch or Cent/RHEL


//script starts here:
console.log(`Linux log monitor version ${ver} started at ${new Date().toISOString()}`);
