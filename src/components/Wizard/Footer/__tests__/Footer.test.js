import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import Footer from '../Footer';

afterEach(cleanup);

describe('<Footer />', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Footer></Footer>, div);
  });

  it('should render an <div> tag', () => {
    const {
      container: { firstChild },
    } = render(<Footer />);
    expect(firstChild.tagName).toEqual('DIV');
  });

  it('should have a class attribute', () => {
    const {
      container: { firstChild },
    } = render(<Footer />);
    expect(firstChild.hasAttribute('class')).toBe(true);
  });

  it('matches snapshot', () => {
    const tree = renderer.create(<Footer name="Footer"></Footer>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
