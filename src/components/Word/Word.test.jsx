import React from 'react';

import Word from './Word';

import { shallow } from 'enzyme';

it('renders', () => {
    shallow(<Word />);
});

it('displays props.value in a div', () => {
    const valueProp = 'Relineator'
    const wrapper = shallow(<Word value={valueProp}/>);

    expect(wrapper.find('div').text()).toEqual(valueProp);
});
