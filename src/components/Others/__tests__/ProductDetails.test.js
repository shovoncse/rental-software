import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import ProductDetails from '../ProductDetails';

afterEach(cleanup);

describe('<ProductDetails />', () => {
  const selected = { name: '', mileage: '', minimum_rent_period: '' };
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProductDetails selected={selected}></ProductDetails>, div);
  });

  it('matches snapshot', () => {
    const tree = renderer.create(<ProductDetails selected={selected}></ProductDetails>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
