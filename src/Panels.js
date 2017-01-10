import React from 'react';
import { Tabs, Card } from 'antd';
import 'antd/dist/antd.css';

import ConsistencyPanel from './ConsistencyPanel';

const TabPane = Tabs.TabPane;

class Panels extends React.Component {
    render() {
        return (
            <Card style={{ 'marginTop': '20px' }}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Consistency" key="1"><ConsistencyPanel /></TabPane>
                    <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
                    <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
                </Tabs>
            </Card>
        );
    }
}
export default Panels;