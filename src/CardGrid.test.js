import React from 'react';
import { Card } from 'antd';
import { mount } from 'enzyme';

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

it('renders 1 Card element', async () => {
    // fetch = jest.fn().mockImplementation(() =>
    //     Promise.resolve(mockResponse(200, null, '{"id":"1234", "idd":"a1234"}')));
    const result = Promise.resolve(mockResponse(200, null, '{"id":"1234", "idd":"a1234"}'));
    fetch = jest.fn(() => result);
    const wrapper = mount(<CardGrid />);
    expect(fetch).toBeCalled();
    // expect(res).toEqual(1);
    expect(wrapper.find(CardGrid).length).toEqual(1);
    await setTimeoutP();
    expect(wrapper.find(Card).length).toEqual(2);

});

function setTimeoutP() {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve();
        }, 1200);
    });
}