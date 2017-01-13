import React from 'react';
import MediaQuery from 'react-responsive';
import { BarGraphToggle, BarGraphSelect, LineGraphSelectScoreTimeline, StackBarGraphToggle, LineGraphToggle, LineGraphCumulativeRuns } from './Charts';
import 'antd/dist/antd.css';

/**
 * Renders graph panel showcasing batsman's consistency
 */
class ConsistencyPanel extends React.Component {
    render() {
        return (
            <div>
                <BarGraphToggle aspect={this.props.aspect} graph_key="totalRuns" />
                <LineGraphToggle aspect={this.props.aspect} graph_key="battingHighlights" />
                <StackBarGraphToggle aspect={this.props.aspect} graph_key="50s_100s" />
                <StackBarGraphToggle aspect={this.props.aspect} graph_key="4s_6s" />
                <MediaQuery minWidth={1000}>
                    <BarGraphSelect aspect={this.props.aspect} graph_key="score_timeline" />
                </MediaQuery>
                <MediaQuery maxWidth={1000}>
                    <LineGraphSelectScoreTimeline aspect={this.props.aspect} graph_key="score_timeline" />
                </MediaQuery>
                <LineGraphCumulativeRuns aspect={this.props.aspect} graph_key="cumulative_score" />
            </div>
        );
    }
}

export default ConsistencyPanel;
