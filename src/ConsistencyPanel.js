import React from 'react';
import MediaQuery from 'react-responsive';
import { BarGraphToggle, BarGraphSelectScoreTimeline, LineGraphSelectScoreTimeline, StackBarGraphToggle, LineGraphToggle, LineGraphCumulativeRuns } from './Charts';
import 'antd/dist/antd.css';
class ConsistencyPanel extends React.Component {
    render() {
        return (
            <div>
                <BarGraphToggle aspect={this.props.aspect} graph_key="totalRuns" />
                <LineGraphToggle aspect={this.props.aspect} graph_key="battingHighlights" />
                <StackBarGraphToggle aspect={this.props.aspect} graph_key="50s_100s" />
                <StackBarGraphToggle aspect={this.props.aspect} graph_key="4s_6s" />
                <MediaQuery query='(min-width: 500px)'>
                    <BarGraphSelectScoreTimeline aspect={this.props.aspect} graph_key="score_timeline" />
                </MediaQuery>
                <MediaQuery query='(max-width: 500px)'>
                    <LineGraphSelectScoreTimeline aspect={this.props.aspect} graph_key="score_timeline" />
                </MediaQuery>
                <LineGraphCumulativeRuns aspect={this.props.aspect} graph_key="cumulative_score" />
            </div>
        );
    }
}

export default ConsistencyPanel;
