//Linux log / email /health graph here

'use strict';

const fs = require('fs');                                               //fs will be used to read system files
var util = require('util');                                             //for using child-process-promise
var exec = require('child-process-promise').exec;                       //promise-wrapped shell command execution
var nodemailer = require('nodemailer');                                 //for sending emails


//check if run as sudo for access to specific logs