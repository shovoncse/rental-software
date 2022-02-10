import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import Header from '../Header';

afterEach(cleanup);

describe('<Header />', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header></Header>, div);
  });

  it('should render an <div> tag', () => {
    const {
      container: { firstChild },
    } = render(<Header />);
    expect(firstChild.tagName).toEqual('DIV');
  });

  it('should have a class attribute', () => {
    const {
      container: { firstChild },
    } = render(<Header />);
    expect(firstChild.hasAttribute('class')).toBe(true);
  });

  it('matches snapshot', () => {
    const tree = renderer.create(<Header></Header>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
