/**
 * For every graph_key, a JS object is returned that corresponds to the graph data
 * of that graph.
 */
module.exports = {
    'totalRuns': {
        'byYear': {
            title: 'Total runs scored',
            xAxisLabel: 'Year',
            yAxisLabel: 'Runs',
            xAxisKey: 'Year',
            legends: ['Runs scored'],
            query: 'SELECT Sum(batting_score)       `Runs scored`,' +
            '       YEAR(`date`)                           `Year` ' +
            'FROM   ? GROUP BY YEAR(`date`) HAVING COUNT(1) > 5',
        },
        'byOpposition': {
            title: 'Total runs scored',
            xAxisLabel: 'Opp.',
            yAxisLabel: 'Runs',
            xAxisKey: 'opposition',
            legends: ['Runs scored'],
            query: 'SELECT Sum(batting_score)       `Runs scored`,' +
            '       opposition ' +
            'FROM ? WHERE balls_faced IS NOT NULL GROUP BY opposition HAVING COUNT(1) > 5',
        },
    },
    'battingHighlights': {
        'byYear': {
            title: 'Batting highlights',
            xAxisLabel: 'Year',
            yAxisLabel: 'Runs',
            xAxisKey: 'Year',
            legends: ['Strike rate', 'Average score per match', 'Highest score'],
            query: 'SELECT ROUND(Sum(batting_score) * 100 / SUM(balls_faced), 2)       `Strike rate`,' +
            'ROUND(Sum(batting_score) / SUM(1),2) `Average score per match`,' +
            'MAX(batting_score)                   `Highest score`,' +
            'YEAR(`date`)                         `Year` ' +
            'FROM ? WHERE balls_faced IS NOT NULL  GROUP BY YEAR(`date`) HAVING COUNT(1) > 5',
        },
        'byOpposition': {
            title: 'Batting highlights',
            xAxisLabel: 'Opp.',
            yAxisLabel: 'Runs',
            xAxisKey: 'opposition',
            legends: ['Strike rate', 'Average score per match', 'Highest score'],
            query: 'SELECT ROUND(Sum(batting_score) * 100 / SUM(balls_faced),2)       `Strike rate`,' +
            'ROUND(Sum(batting_score) / SUM(1), 2)                    `Average score per match`,' +
            'MAX(batting_score)                                       `Highest score`,' +
            '       opposition ' +
            'FROM   ? WHERE balls_faced IS NOT NULL GROUP BY opposition HAVING COUNT(1) > 5',
        },
    },
    '50s_100s': {
        'byYear': {
            title: 'Centuries and Half Centuries',
            xAxisLabel: 'Year',
            yAxisLabel: 'Count',
            xAxisKey: 'Year',
            legends: ['Centuries', 'Half centuries'],
            query: 'SELECT Count(IF(batting_score >= 50 ' +
            '                AND batting_score < 100, 1, NULL))           `Half centuries`, ' +
            '       Count(IF(batting_score > 100, 1, NULL))               `Centuries`, ' +
            'YEAR(`date`)                         `Year` ' +
            'FROM ? WHERE balls_faced IS NOT NULL  GROUP BY YEAR(`date`) HAVING COUNT(1) > 5',
        },
        'byOpposition': {
            title: 'Centuries and Half Centuries',
            xAxisLabel: 'Opp.',
            yAxisLabel: 'Count',
            xAxisKey: 'opposition',
            legends: ['Centuries', 'Half centuries'],
            query: 'SELECT Count(IF(batting_score >= 50 ' +
            '                AND batting_score < 100, 1, NULL))           `Half centuries`, ' +
            '       Count(IF(batting_score > 100, 1, NULL))               `Centuries`, ' +
            '       opposition ' +
            'FROM   ? WHERE balls_faced IS NOT NULL GROUP BY opposition HAVING COUNT(1) > 5',
        },
    },
    '4s_6s': {
        'byYear': {
            title: 'Boundaries',
            xAxisLabel: 'Year',
            yAxisLabel: 'Count',
            xAxisKey: 'Year',
            legends: ['6s', '4s'],
            query: 'SELECT Sum(`4s`)        `4s`, ' +
            '       Sum(`6s`)               `6s`, ' +
            'YEAR(`date`)                         `Year` ' +
            'FROM ? WHERE balls_faced IS NOT NULL  GROUP BY YEAR(`date`) HAVING COUNT(1) > 5',
        },
        'byOpposition': {
            title: 'Boundaries',
            xAxisLabel: 'Opp.',
            yAxisLabel: 'Count',
            xAxisKey: 'opposition',
            legends: ['6s', '4s'],
            query: 'SELECT Sum(`4s`)        `4s`, ' +
            '       Sum(`6s`)               `6s`, ' +
            '       opposition ' +
            'FROM   ? WHERE balls_faced IS NOT NULL GROUP BY opposition HAVING COUNT(1) > 5',
        },
    },
    'score_timeline': {
        title: 'Runs scored',
        xAxisLabel: 'Date',
        yAxisLabel: 'Score',
        xAxisKey: 'date',
        legends: ['Runs scored'],
        filter: 'opposition',
        query: 'SELECT batting_score AS `Runs scored`, ' +
        '       opposition, ' +
        '       ground `Ground`, ' +
        '       match_result `Match result`, ' +
        '       result_margin `Result margin`,' +
        '       batting_innings `Batting innings`, ' +
        '       balls_faced `Balls faced`, ' +
        '       strike_rate `Strike rate`, ' +
        '       `4s`, ' +
        '       `6s`, ' +
        '       `date` ' +
        'FROM   ? ' +
        'WHERE  balls_faced IS NOT NULL ' +
        'ORDER  BY `date`',
    },
};
