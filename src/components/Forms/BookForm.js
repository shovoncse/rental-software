import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, DatePicker, Form } from 'antd';
import moment from 'moment';

const BookForm = ({ name }) => {
  let dispatch = useDispatch();
  // Select from state
  let products = useSelector((state) => state.products.products);
  // Booking confirmation
  const { Option } = Select;
  const { RangePicker } = DatePicker;

  // Get single product by Code
  const getProductById = (code) => {
    dispatch({ type: 'products/getProductById', payload: { id: code } });
  };

  // Previous Date disabled
  const disabledDate = (current) => {
    // Can not select days before today and today
    return moment().add(-1, 'days') >= current;
  };

  return (
    <>
      <Form
        form={name}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="product"
          label="Select Product"
          className="font-semibold"
          rules={[
            {
              required: true,
              message: 'Please select the product!',
            },
          ]}
        >
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={getProductById}
          >
            {products
              .filter((item) => item.availability && !item.needing_repair)
              .map((data, index) => (
                <Option value={data.code} key={index}>
                  {data.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="date"
          label="Rental Period"
          className="font-semibold"
          rules={[
            {
              required: true,
              message: 'Please select the date range',
            },
          ]}
        >
          <RangePicker disabledDate={disabledDate} />
        </Form.Item>
      </Form>
    </>
  );
};

export default BookForm;
