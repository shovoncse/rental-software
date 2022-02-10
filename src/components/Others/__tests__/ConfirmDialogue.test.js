import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import ConfirmDialogue from '../ConfirmDialogue';
afterEach(cleanup);

describe('<ConfirmDialogue />', () => {
  const selected = { estPrice: '' };
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <ConfirmDialogue selected={selected}></ConfirmDialogue>,
      div
    );
  });

  it('should render an <p> tag', () => {
    const {
      container: { firstChild },
    } = render(<ConfirmDialogue selected={selected} />);
    expect(firstChild.tagName).toEqual('P');
  });

  it('should have a class attribute', () => {
    const {
      container: { firstChild },
    } = render(<ConfirmDialogue selected={selected} />);
    expect(firstChild.hasAttribute('class')).toBe(true);
  });

  it('matches snapshot', () => {
    const tree = renderer
      .create(<ConfirmDialogue selected={selected}></ConfirmDialogue>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
