const csvToJson = require('csvtojson');
/**
 * Parses csv containing batsman stats into jsonObj.
 * If batting_score ends with *, it removes * and sets notOut to true.
 * If opposition starts with 'v ' (E.g. 'v Bangladesh'), it removes 'v '.
 * All NaN and dashes are set as null
 * @param csvPath Path to csv containing scores
 * @returns Promise On success, it returns an array of object.
 */
function parseSachinCsv(csvPath) {
    return new Promise(function (resolve, reject) {
        csvToJson({ checkType: false }).fromFile(csvPath)
            .transf((jsonObj) => {
                jsonObj.notOut = false;
                if (jsonObj.batting_score.endsWith('*')) {
                    jsonObj.notOut = true;
                    jsonObj.batting_score = jsonObj.batting_score.slice(0, -1);
                }
                jsonObj.batting_score = Number(jsonObj.batting_score);
                jsonObj.wickets = Number(jsonObj.wickets);
                jsonObj.runs_conceded = Number(jsonObj.runs_conceded);
                jsonObj.catches = Number(jsonObj.catches);
                jsonObj.stumps = Number(jsonObj.stumps);
                if (jsonObj.opposition.startsWith('v ')) {
                    jsonObj.opposition = jsonObj.opposition.slice(2);
                }
                jsonObj.balls_faced = Number(jsonObj.balls_faced);
                jsonObj.strike_rate = Number(jsonObj.strike_rate);
                jsonObj['4s'] = Number(jsonObj['4s']);
                jsonObj['6s'] = Number(jsonObj['6s']);
                for (var key in jsonObj) {
                    if (typeof jsonObj[key] === 'number' && isNaN(jsonObj[key]))
                        jsonObj[key] = null;
                }

            })
            .on('end_parsed', (jsonArrObj) => {
                return resolve(jsonArrObj);
            })
            .on('done', (err) => {
                if (err) return reject(err);
            });
    });
}
exports.parseSachinCsv = parseSachinCsv;