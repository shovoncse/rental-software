import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import { Form } from 'antd';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import BookForm from '../BookForm';
import { store } from 'store/';
import { Provider } from 'react-redux';

afterEach(cleanup);

describe('<BookForm />', () => {
  const [bookForm] = Form.useForm();
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <BookForm name={bookForm}></BookForm>
      </Provider>,
      div
    );
  });

  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BookForm name={bookForm}></BookForm>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
