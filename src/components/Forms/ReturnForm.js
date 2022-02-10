import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Select, Form, InputNumber } from 'antd';

const ReturnForm = ({ name }) => {
  let dispatch = useDispatch();
  let bookings = useSelector((state) => state.products.bookings);

  const { Option } = Select;

  // getProductById
  const getBookingProductById = (code) => {
    dispatch({ type: 'products/getBookingProductById', payload: { id: code } });
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
            onChange={getBookingProductById}
          >
            {bookings.map((data, index) => (
              <Option value={data.code} key={index}>
                {data.name ? data.name : ''}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="mileage"
          label="Used Mileage"
          className="font-semibold"
          rules={[
            {
              required: true,
              message: 'Please enter used miledge',
            },
          ]}
        >
          <InputNumber min={10} style={{ width: 200 }} />
        </Form.Item>
      </Form>
    </>
  );
};

export default ReturnForm;
