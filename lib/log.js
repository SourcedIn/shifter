/*
Copyright (c) 2012, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://yuilibrary.com/license/
*/
var color = require('ansi-color').set;
var hasColor = process.stdin.isTTY;

var quiet;
var silent;

var prefix;

exports.isTTY = hasColor;

exports.quiet = function () {
    quiet = true;
};

exports.silent = function () {
    silent = true;
    quiet = true;
};

exports.reset = function(options) {
    silent = false;
    quiet = false;
    if (options && options.color === false) {
        hasColor = false;
    }
    prefix = exports.color('shifter', 'magenta');
};

exports.color = function (str, code) {
    if (!hasColor) {
        return str;
    }
    return color(str, code);
};


exports.info = function (str) {
    if (!quiet) {
        console.log(prefix, exports.color('[info]', 'white'), str);
    }
};

exports.log = function (str) {
    if (!quiet) {
        console.log(prefix, exports.color('[queu]', 'cyan'), str);
    }
};

exports.warn = function (str) {
    if (!silent) {
        console.log(prefix, exports.color('[warn]', 'yellow'), str);
    }
};

exports.error = function (str) {
    if (!silent) {
        console.error(prefix, exports.color('[error]', 'red'), str);
    }
    process.exit(1);
};

exports.err = function (str) {
    if (!silent) {
        console.error(prefix, exports.color('[err]', 'red'), str);
    }
};


exports.console = {
    log: function() {
        if (!quiet) {
            console.log.apply(this, arguments);
        }
    },
    error: function() {
        if (!silent) {
            console.error.apply(this, arguments);
        }
    }
};
