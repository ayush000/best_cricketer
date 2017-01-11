import React from 'react';
import { Card } from 'antd';
import { mount } from 'enzyme';
import { parseJSON } from './commonfunction';

jest.mock('./commonfunction', () => { return { 'parseJSON': jest.fn() }; });
import CardGrid from './CardGrid';

const mockResponse = (status, statusText, response) => {
    return new window.Response(response, {
        status: status,
        statusText: statusText,
        headers: {
            'Content-type': 'application/json',
        },
    });
};



it('renders 1 Card elements', async () => {
    const result = Promise.resolve(mockResponse(200, null, '{"id":"1234"}'));
    const parsedResult = Promise.resolve({ 'id': '1234' });
    parseJSON.mockImplementation(() => parsedResult);
    // eslint-disable-next-line no-native-reassign
    fetch = jest.fn(() => result);
    const wrapper = mount(<CardGrid />);
    await result;
    await parsedResult;

    expect(fetch).toBeCalled();
    expect(wrapper.find(CardGrid).length).toEqual(1);
    expect(wrapper.find(Card).length).toEqual(1);
});
