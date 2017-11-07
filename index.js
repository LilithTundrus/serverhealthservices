'use strict';
const fs = require('fs');                                               //fs will be used to read system files
const config = require('./config');                                     //config file for script (file locations)
var isRoot = require('./lib/isRootCheck.js');                           //check if process is being run as root
var util = require('util');                                             //for using child-process-promise
var os = require('os');                                                 //for detecting if Linux
var nodemailer = require('nodemailer');                                 //for sending emails
const Tail = require('nodejs-tail');                                    //for tailing files
const ver = config.ver;                                                 //script version for debugging on deployments
const logLocations = config.logLocationsArray;
/*
Linux log / email / health graph thing...

Notes: You MUST start this from the drive where /var/log/ dir is located!

TODO: do more things with this
TODO: Extend logHandler to be generic
TODO: include the log configuration as an array in config.js

*/
// Script logical order
// check if host OS is in fact Linux and run as sudo (sanity check)
// scope out /var/log, make sure it exists as a sanity check
// read some files (using tail?)
// determine differences since last check
// if there are differences send an email to sysAdmin periodically
// optional: create an activity graph


//script starts here:
console.log(`Linux log monitor version ${ver} started at ${new Date().toISOString()}`);
if (!isLinux()) {                                                       //check for the wrong outcome FIRST for less code blocks
    console.log('OS is NOT Linux, exiting');
    process.exit(1);
} else {
    if (!isRoot()) {                                                    //if not root
        console.log('Error: Script is must be run as root to avoid log access issues');
        process.exit(1);
    } else {
        if (logDirCheck() !== true) {
            console.log('/var/log/ does NOT exist! Exiting...');        //debugging
            return process.exit(1);
        }
        return logHandler();                                            //tail the logfiles
    }
}

/**
 * check if OS is linux, otherwise we can't do anything
 * @returns {boolean}
 */
function isLinux() {
    if (os.type() !== 'Linux') {
        return false;
    } else {
        return true;
    }
}

/**
 * check if /var/log/ exists (sanity check)
 * @returns {boolean}
 */
function logDirCheck() {
    if (fs.existsSync('/var/log/') !== true) {
        return false;
    } else {
        console.log('/var/log/ exists');                                //debugging
        return true;
    }
}

//do stuff after all sanity checks are met
function logHandler() {
    logLocations.forEach((logLocation, index) => {
        console.log(logLocation);                                       //debugging
        if (fs.existsSync(logLocation) !== true) {                      //ensure logLocation exists (sanity check)
            console.log(`Error: ${logLocation} is not a log file that exists in /var/log`);
            logLocation.slice(index);
            console.log(logLocation.length)                             //debugging
        }
        const tail = new Tail('/var/log/secure');
        var tailArray = [];
        tail.on('line', (line) => {
            //return sendEmail('New Auth Activity', line)
            //push tail line to array
            console.log(line);                                              //debugging
            tailArray.push(line);
        })
        tail.watch();

        //every so often send an email with the array
        setInterval(function () {
            if (tailArray.length == 0) {
                return;                                                     //return, do nothing
            }
            sendEmail('New Auth Activity', JSON.stringify(tailArray.join('\n'), null, 2))
            tailArray = [];                                                 //clear the array
            return;
        }, 10 /* 60 */ * 1000);                                             //every 10 minutes


    })

}

function tailConstruct(fileToTail) {

}

function sendEmail(subject, message) {                                  //send an email given the args to remove the duplicate code between beta an normal checks
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.gmailSender,
            pass: config.gmailPassword
        }
    });
    let mailOptions = {
        from: config.gmailSender,
        to: config.gmailReceiver,
        subject: subject,
        text: message
    };
    return transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}