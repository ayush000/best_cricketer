const csvToJson = require("csvtojson");
const moment = require("moment");
/**
 * Parses csv containing batsman stats into jsonObj.
 * If batting_score ends with *, it removes * and sets notOut to true.
 * If opposition starts with 'v ' (E.g. 'v Bangladesh'), it removes 'v '.
 * All NaN and dashes are set as null
 * @param csvPath Path to csv containing scores
 * @returns Promise On success, it returns an array of object.
 */
async function parseSachinCsv(csvPath) {
  const jsonArr = await csvToJson({ checkType: false }).fromFile(csvPath);

  const outputArr = jsonArr.map((jsonObj) => {
    let notOut = false;
    let batting_score = Number(jsonObj.batting_score);

    if (jsonObj?.batting_score?.endsWith("*")) {
      jsonObj.notOut = true;
      batting_score = Number(jsonObj.batting_score.slice(0, -1));
    }

    let opposition = jsonObj.opposition;
    if (jsonObj?.opposition?.startsWith("v ")) {
      opposition = jsonObj.opposition.slice(2);
    }

    const outputObj = {
      ...jsonObj,
      notOut,
      batting_score,
      wickets: Number(jsonObj.wickets),
      runs_conceded: Number(jsonObj.runs_conceded),
      catches: Number(jsonObj.catches),
      stumps: Number(jsonObj.stumps),
      opposition,
      date: moment(jsonObj.date, "M/D/YYYY").format("YYYY-MM-DD"),
      balls_faced: Number(jsonObj.balls_faced),
      strike_rate: Number(jsonObj.strike_rate),
      "4s": Number(jsonObj["4s"]),
      "6s":Number(jsonObj["6s"]),
    };

    for (let key in outputObj) {
      if (typeof outputObj[key] === "number" && isNaN(outputObj[key]))
      outputObj[key] = null;
    }

    return outputObj;
  })

  return outputArr

}
exports.parseSachinCsv = parseSachinCsv;
