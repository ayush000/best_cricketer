import React from 'react';
import { BarGraphToggle, BarGraphSelect } from './Charts';
import 'antd/dist/antd.css';
class ConsistencyPanel extends React.Component {
    render() {
        return (
            <div>
                <BarGraphToggle graph_key="totalRuns" />
                <BarGraphToggle graph_key="battingHighlights" />
                <BarGraphToggle graph_key="50s_100s" />
                <BarGraphToggle graph_key="4s_6s" />
                <BarGraphSelect graph_key="score_timeline" />
            </div>
        );
    }
}

export default ConsistencyPanel;
