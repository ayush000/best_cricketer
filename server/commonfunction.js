function writeLog(str) {
    if (process.env.NODE_ENV !== 'test') {
        console.log(str);
    }
}

exports.writeLog = writeLog;