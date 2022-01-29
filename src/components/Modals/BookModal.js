import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Modal, Select, DatePicker, Form, List } from 'antd';
import moment from 'moment';
import Swal from 'sweetalert2';

const BookModal = ({ visible, setBookModal, setConfirmModal }) => {
  let dispatch = useDispatch();
  // Select from state
  let products = useSelector((state) => state.products.products);
  let selected = useSelector((state) => state.products.selected) || '';

  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const [bookForm] = Form.useForm();

  // Click to OK button
  const handleBookOk = ({ product, date }) => {
    const a = moment(date[0]);
    const b = moment(date[1]);

    let bookDates = [];
    bookDates.push(moment(date[0]).format('l'));
    bookDates.push(moment(date[1]).format('l'));

    const days = Math.abs(a.diff(b, 'days'));

    // Validate min Rent period
    if (selected.minimum_rent_period <= days) {
      dispatch({ type: 'products/getProductById', payload: { id: product } });
      dispatch({
        type: 'products/getCalculatedPrice',
        payload: { days, period: bookDates },
      });
      setConfirmModal(true);
    } else {
      Swal.fire(
        'Sorry!',
        'Minimum rental period is ' + selected.minimum_rent_period,
        'warning'
      );
    }
  };

  // Reset selected product after modal close
  useEffect(() => {
    if (!visible) {
      bookForm.resetFields();
      dispatch({ type: 'products/resetSelected' });
    }
  }, [visible, bookForm, dispatch]);

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
      <Modal
        visible={visible}
        width={600}
        title="Book a product"
        okText="Yes"
        cancelText="no"
        onCancel={() => setBookModal(false)}
        onOk={() => {
          bookForm
            .validateFields()
            .then((values) => {
              handleBookOk(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Row justify="space-between">
          <Col span={10}>
            <Form
              form={bookForm}
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
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
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
          </Col>
          <Col span={10}>
            {selected ? (
              <List size="small" bordered className="bg-sky-100">
                <List.Item key={1}>
                  <span className="text-sm font-bold">{selected.name}</span>
                </List.Item>
                <List.Item key={2}>
                  <span className="font-semibold">Mileage:</span>{' '}
                  {selected.mileage || '0'} <br />
                  <span className="font-semibold">Price:</span> {selected.price}
                  <br />
                  <span className="font-semibold">Min Rent:</span> For{' '}
                  <span className="font-bold">
                    {selected.minimum_rent_period}
                  </span>{' '}
                  Day(s)
                </List.Item>
                <List.Item key={3}>
                  {selected.needing_repair ? (
                    <span className="text-sm text-red-500 font-bold">
                      Need to Repair
                    </span>
                  ) : (
                    <span className="text-sm font-bold text-green-700">
                      Repairing Not Necessary
                    </span>
                  )}
                </List.Item>
              </List>
            ) : null}
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default BookModal;
