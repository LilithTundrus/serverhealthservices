//arbitrary script version -- you don't have to change this
exports.ver = '0.1.0';

//vars used for nodemailer to send server reports to a set email address
exports.gmailSender = 'GMAIL_BOT_HERE';
//password for the gmail sender (required)
exports.gmailPassword = 'GMAIL_SENDER_PASSWORD_HERE';
exports.gmailReceiver = 'SYSADMIN_EMAIL_HERE';
exports.logLocationsArray = ['/var/log/log1.log', '/var/log/log2.log'];