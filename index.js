//Linux log / email /health graph here

'use strict';
const fs = require('fs');                                               //fs will be used to read system files
const config = require('./config');                                     //config file for script (file locations)
var isRoot = require('./lib/isRootCheck.js');                           //check if process is being run as root
var util = require('util');                                             //for using child-process-promise
var os = require('os');                                                 //for detecting if Linux
var exec = require('child-process-promise').exec;                       //promise-wrapped shell command execution
var nodemailer = require('nodemailer');                                 //for sending emails
const ver = config.ver;                                                 //script version for debugging on deployments
/*
Notes: You MUST start this from the drive where /var/log/ dir is located!


*/

//check if host OS is in fact Linux
//check if run as sudo for access to specific logs


//detect which Linux OS: *bian or Arch or Cent/RHEL


//script starts here:
console.log(`Linux log monitor version ${ver} started at ${new Date().toISOString()}`);

//checking for bad condition first (best way to do if statements)
if(!isLinux()) {
    console.log('OS is NOT Linux, exiting');
    process.exit(1);
} else {
    if (!isRoot()) {                                                    //if not root
        console.log('Script is NOT running as root');                   //debugging
    
        //check if /var/log/ exists
        if (fs.existsSync('/var/log/') !== true) {
            console.log('/var/log does not exist!');
        } else {
            //read some files
            console.log('/var/log/ exists');
        }
    } else {
        console.log('Script is running as root!');                      //debugging
    
    }
}

console.log('Script ended');                                        //debugging



/**
 * check if OS is linux, otherwise we can't do anything
 * @returns {boolean}
 */
function isLinux() {
    if (os.type() !== 'linux') {
        return false;
    } else {
        return true;
    }
}