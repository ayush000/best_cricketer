import React from 'react';
import { BarGraphToggle } from './Charts';
import 'antd/dist/antd.css';
class ConsistencyPanel extends React.Component {
    render() {
        return (
            <div>
                <BarGraphToggle graph_key="totalRuns" />
                <BarGraphToggle graph_key="battingHighlights" />
            </div>
        );
    }
}

export default ConsistencyPanel;
