import React from 'react';
import ReactDOM from 'react-dom';
import Button from './../Button';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer'

afterEach(cleanup);
it('should render without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Button></Button>, div);
});

it('should render button correctly', () => {
  const { getByTestId } = render(<Button text="Click me"></Button>);
  getByTestId('button');
  expect(getByTestId('button')).toHaveTextContent('Click me');
});

it("matches snapshot", () => {
  const tree = renderer.create(<Button text="Book"></Button>).toJSON();
  expect(tree).toMatchSnapshot();
})