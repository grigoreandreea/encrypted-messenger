import React from 'react';
import { shallow } from 'enzyme';
import NavBar from '../NavBar';

describe('NavBar', () => {
    it('should render', () => {
        const comp = shallow(<NavBar/>);
        expect(comp).toBeTruthy();
    })
})