import { shallow } from 'enzyme';
import React from 'react';
import HelloWorld from './HelloWorld';

describe('<HelloWorld />', () => {
  const wrapper = shallow(<HelloWorld />);

  it('should say hello', () => {
    expect(wrapper.find('p').text()).toBe('hello world!');
  });
});
