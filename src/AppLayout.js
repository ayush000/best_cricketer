import React from 'react';
import { Layout, DatePicker, Row, Col, Affix, Select } from 'antd';
import MediaQuery from 'react-responsive';
// import moment from 'moment';
import App from './App';
const { Header, Content, Footer } = Layout;

// const RangePicker = DatePicker.RangePicker;
// const Option = Select.Option;

/**
 * Create overall layout, header and footer for the content
 */
class AppLayout extends React.Component {
    render() {
        return (
            <Layout className="layout">
                <DefaultHeader />
                <Content>
                    <div><App /></div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Made by Ayush Sachdeva
                </Footer>
            </Layout>
        );
    }
}
/*class DefaultHeader extends React.Component {
    render() {
        return (
            <Affix>
                <Header style={{ width: '100vw', backgroundColor: '#334961' }}>
                    <Row>
                        <Col span={8}>
                            <div style={{ color: 'white', fontSize: '16px', textAlign: 'left' }}>
                                Sachin Tendulkar
                                </div>
                        </Col>
                        <Col span={8}>
                            <RangePicker />
                        </Col>
                        <Col span={8}>
                            <Col span={4}>
                                <Select size="small" style={{ width: 120 }}>
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                </Select>
                            </Col>
                            <Select size="small" style={{ width: 120 }}>
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                            </Select>
                        </Col>
                    </Row>
                </Header>
            </Affix>

        );
    }
}
*/

/**
 * Header Component for the layout
 */
class DefaultHeader extends React.Component {
    /**
     * Truncates header text for small screen displays
     */
    render() {
        return (
            <Header style={{ backgroundColor: '#334961' }}>
                <div style={{ color: 'white', fontSize: '16px', textAlign: 'left' }}>
                    <MediaQuery query='(min-width: 500px)'>
                        Sachin Tendulkar - Data display for the greatest batsman
                            </MediaQuery>
                    <MediaQuery query='(max-width: 500px)'>
                        Sachin Tendulkar
                        </MediaQuery>
                </div>
            </Header>
        );
    }
}
export default AppLayout;
