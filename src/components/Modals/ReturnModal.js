import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Modal, Form } from 'antd';
import ProductDetails from 'components/Others/ProductDetails';
import ConfirmDialogue from 'components/Others/ConfirmDialogue';
import ReturnForm from 'components/Forms/ReturnForm';
import ErrorBoundary from 'utils/ErrorBoundary';
import Swal from 'sweetalert2';
import Button from 'components/Buttons/Button';

const ReturnModal = ({ visible, setReturn }) => {
  let dispatch = useDispatch();
  let selected = useSelector((state) => state.products.selected);

  const [returnForm] = Form.useForm();
  const [confirm, setConfirm] = useState(false);
  // Returning product
  const handleReturnOk = ({ mileage }) => {
    dispatch({ type: 'products/updateSelected', payload: { mileage } });
    setConfirm(true);
  };

  useEffect(() => {
    if (!visible) {
      returnForm.resetFields();
      dispatch({ type: 'products/resetSelected' });
    }
  }, [visible, returnForm, dispatch]);
  // Confirm
  const handleReturnConfirm = () => {
    dispatch({ type: 'products/returnProduct' });
    Swal.fire('Sucessfull', 'Your Return is successfull', 'success');
    setConfirm(false);
    setReturn(false);
  };

  const handleReturn = () => {
    returnForm
      .validateFields()
      .then((values) => {
        handleReturnOk(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <>
      <Modal
        visible={visible}
        title="Return a product"
        okText="Yes"
        cancelText="no"
        onCancel={confirm ? () => setConfirm(false) : () => setReturn(false)}
        footer={[
          <Button
            type="red"
            key={1}
            text="No"
            click={confirm ? () => setConfirm(false) : () => setReturn(false)}
          />,
          <Button
            type="blue"
            key={2}
            text="Yes"
            click={confirm ? () => handleReturnConfirm() : () => handleReturn()}
          />,
        ]}
      >
        {!confirm ? (
          <Row justify="space-between">
            <Col span={10}>
              {/* Return Form */}
              <ErrorBoundary>
                <ReturnForm name={returnForm} />
              </ErrorBoundary>
            </Col>
            <Col span={12}>
              {selected ? (
                <ErrorBoundary>
                  <ProductDetails selected={selected} />
                </ErrorBoundary>
              ) : null}
            </Col>
          </Row>
        ) : (
          <ErrorBoundary>
            <ConfirmDialogue selected={selected} />
          </ErrorBoundary>
        )}
      </Modal>
    </>
  );
};

export default ReturnModal;
