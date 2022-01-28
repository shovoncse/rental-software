import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Modal, Select, Form, List, InputNumber } from 'antd';
import moment from 'moment';

const ReturnModal = ({ visible, setReturnModal, setConfirmModal }) => {
  let dispatch = useDispatch();
  let bookings = useSelector((state) => state.products.bookings);
  let selected = useSelector((state) => state.products.selected);

  const { Option } = Select;
  const [returnForm] = Form.useForm();

  const handleReturnOk = ({ mileage }) => {
    dispatch({ type: 'products/updateSelected', payload: { mileage } });
    setConfirmModal(true);
  };

  useEffect(() => {
    if (!visible) {
      returnForm.resetFields();
      dispatch({ type: 'products/resetSelected' });
    }
  }, [visible]);

  // getProductById
  const getBookingProductById = (code) => {
    dispatch({ type: 'products/getBookingProductById', payload: { id: code } });
  };

  return (
    <>
      <Modal
        visible={visible}
        title="Return a product"
        okText="Yes"
        cancelText="no"
        onCancel={() => setReturnModal(false)}
        onOk={() => {
          returnForm
            .validateFields()
            .then((values) => {
              handleReturnOk(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Row justify="space-between">
          <Col span={10}>
            <Form
              form={returnForm}
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
                  onChange={getBookingProductById}
                >
                  {bookings.map((data, index) => (
                    <Option value={data.code} key={index}>
                      {data.name}
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
          </Col>
          <Col span={12}>
            {selected ? (
              <List size="small" bordered className="bg-sky-100">
                <List.Item>
                  <span className="font-bold">{selected.name}</span>
                </List.Item>
                <List.Item>
                  <span className="font-bold">Bookd for:</span>{' '}
                  {selected.bookingsDays} Days
                </List.Item>
                <List.Item>
                  <span className="font-bold">Period:</span>{' '}
                  {selected.bookingsDates
                    ? moment(selected.bookingsDates[0]).format('l') +
                      '-' +
                      moment(selected.bookingsDates[1]).format('l')
                    : 'Not Found'}
                </List.Item>
                <List.Item>
                  <span className="font-bold">Mileage:</span>{' '}
                  {selected.mileage || 0}
                </List.Item>
              </List>
            ) : null}
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default ReturnModal;
