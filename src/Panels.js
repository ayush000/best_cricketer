import React from 'react';
import { Tabs, Card } from 'antd';
import 'antd/dist/antd.css';

import ConsistencyPanel from './ConsistencyPanel';

const TabPane = Tabs.TabPane;

class Panels extends React.Component {
    render() {
        return (
            <Card style={{ 'marginTop': '20px' }}>
                <ConsistencyPanel />
            </Card>
        );
    }
}
export default Panels;