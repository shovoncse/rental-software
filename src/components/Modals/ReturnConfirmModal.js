import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Modal } from 'antd';
import Swal from 'sweetalert2';

const ReturnConfirmModal = ({visible, setReturnModal, setConfirmModal}) => {

    let selected = useSelector((state) => state.products.selected) || "";

    let dispatch = useDispatch();

    const handleReturnConfirm = () => {
        dispatch({ type: "products/returnProduct" })
        Swal.fire(
            'Sucessfull',
            'Your Return is successfull',
            'success'
        )
        setConfirmModal(false)
        setReturnModal(false)
    };

    return (
        <>
            <Modal
                visible={visible}
                title="Return a product"
                okText="Yes"
                cancelText="no"
                onCancel={() => setConfirmModal(false)}
                onOk={() => handleReturnConfirm()}
            >
                <p className='text-xl'>Your Calculated Price is <span className='font-bold text-red-600'>${selected.estPrice}</span></p>
                <p className='text-lg font-semibold'>Do you want to proceed ?</p>
            </Modal>
        </>
    )
}

export default ReturnConfirmModal