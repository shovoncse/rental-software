import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import ProductTable from '../ProductTable';
import { store } from 'store/';
import { Provider } from 'react-redux';

afterEach(cleanup);

describe('<ProductTable />', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <ProductTable></ProductTable>
      </Provider>,
      div
    );
  });

  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ProductTable></ProductTable>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
