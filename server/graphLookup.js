module.exports = {
    'totalRuns': {
        'byYear': {
            title: 'Total runs scored',
            xAxisLabel: 'Year',
            yAxisLabel: 'Runs',
            query: 'SELECT Sum(batting_score)       `Runs scored`,' +
            '       YEAR(`date`)                           `Year` ' +
            'FROM   ? GROUP BY YEAR(`date`) HAVING COUNT(1) > 5',
        },
        'byOpposition': {
            title: 'Total runs scored',
            xAxisLabel: 'Opposition',
            yAxisLabel: 'Runs',
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
            query: 'SELECT ROUND(Sum(batting_score) * 100 / SUM(balls_faced), 2)       `Strike rate`,' +
            'ROUND(Sum(batting_score) / SUM(1),2) `Average score per match`,' +
            'MAX(batting_score)                   `Highest score`,' +
            'YEAR(`date`)                         `Year` ' +
            'FROM ? WHERE balls_faced IS NOT NULL  GROUP BY YEAR(`date`) HAVING COUNT(1) > 5',
        },
        'byOpposition': {
            title: 'Batting highlights',
            xAxisLabel: 'Opposition',
            yAxisLabel: 'Runs',
            query: 'SELECT ROUND(Sum(batting_score) * 100 / SUM(balls_faced),2)       `Strike rate`,' +
            'ROUND(Sum(batting_score) / SUM(1), 2)                    `Average score per match`,' +
            'MAX(batting_score)                                       `Highest score`,' +
            '       opposition ' +
            'FROM   ? WHERE balls_faced IS NOT NULL GROUP BY opposition HAVING COUNT(1) > 5',
        },
    },
};
