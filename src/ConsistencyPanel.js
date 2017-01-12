import React from 'react';
import { BarGraphToggle, BarGraphSelectScoreTimeline, StackBarGraphToggle, LineGraphToggle, LineGraphCumulativeRuns } from './Charts';
import 'antd/dist/antd.css';
class ConsistencyPanel extends React.Component {
    render() {
        return (
            <div>
                <BarGraphToggle graph_key="totalRuns" />
                <LineGraphToggle graph_key="battingHighlights" />
                <StackBarGraphToggle graph_key="50s_100s" />
                <StackBarGraphToggle graph_key="4s_6s" />
                <BarGraphSelectScoreTimeline graph_key="score_timeline" />
                <LineGraphCumulativeRuns graph_key="cumulative_score"/>
            </div>
        );
    }
}

export default ConsistencyPanel;
