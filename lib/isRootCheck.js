'use strict';
//check if process is being run as root
module.exports = function () {
	return process.getuid && process.getuid() === 0;
};