import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Modal, Form } from 'antd';
import moment from 'moment';
import Swal from 'sweetalert2';
import BookForm from 'components/Forms/BookForm';
import ProductDetails from 'components/Others/ProductDetails';
import ConfirmDialogue from 'components/Others/ConfirmDialogue';

const BookModal = ({ visible, setBook }) => {
  let dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);
  const [bookForm] = Form.useForm();

  // Select from state
  let selected = useSelector((state) => state.products.selected) || '';

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
      setConfirm(true);
    } else {
      Swal.fire(
        'Sorry!',
        'Minimum rental period is ' + selected.minimum_rent_period,
        'warning'
      );
    }
  };

  // Booking Function
  const handleBookConfirm = () => {
    // Booking Action
    dispatch({ type: 'products/productBooking' });
    // Alert
    Swal.fire('Sucessfull', 'Your booking is successfull', 'success');
    // Modals Hide
    setConfirm(false);
    setBook(false);
  };

  const handleBook = () => {
    bookForm
      .validateFields()
      .then((values) => {
        handleBookOk(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  // Reset selected product after modal close
  useEffect(() => {
    if (!visible) {
      bookForm.resetFields();
      dispatch({ type: 'products/resetSelected' });
    }
  }, [visible, bookForm, dispatch]);

  return (
    <>
      <Modal
        visible={visible}
        width={600}
        title="Book a product"
        okText="Yes"
        cancelText="no"
        onCancel={confirm ? () => setConfirm(false) : () => setBook(false)}
        onOk={confirm ? () => handleBookConfirm() : () => handleBook()}
      >
        {!confirm ? (
          <Row justify="space-between">
            <Col span={10}>
              {/* Booking Form */}
              <BookForm name={bookForm} />
            </Col>
            <Col span={10}>
              {selected ? <ProductDetails selected={selected} /> : null}
            </Col>
          </Row>
        ) : (
          <ConfirmDialogue selected={selected} />
        )}
      </Modal>
    </>
  );
};

export default BookModal;
