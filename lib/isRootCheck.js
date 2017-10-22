'use strict';
//check if process is being run as root
/**
 * borrowed from https://github.com/sindresorhus/is-root since it's so short to not just steal 
 * and keep npm requires down
 * @returns {boolean}
 */
module.exports = function () {
	return process.getuid && process.getuid() === 0;
};