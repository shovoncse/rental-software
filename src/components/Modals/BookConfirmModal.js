import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Modal } from 'antd';
import Swal from 'sweetalert2';

const BookConfirmModal = ({visible, setBookModal, setConfirmModal}) => {

    let selected = useSelector((state) => state.products.selected) || "";

    let dispatch = useDispatch();

    const handleBookConfirm = () => {

        // insert to booked

        // update availability
        dispatch({ type: "products/productBooking" })
        
        Swal.fire(
            'Sucessfull',
            'Your booking is successfull',
            'success'
        )
        setConfirmModal(false)
        setBookModal(false)
    };

    return (
        <>
            <Modal
                visible={visible}
                title="Book a product"
                okText="Yes"
                cancelText="no"
                onCancel={() => setConfirmModal(false)}
                onOk={() => handleBookConfirm()}
            >
                <p className='text-xl'>Your Estimated Price is <span className='font-bold text-blue-600'>${selected.estPrice}</span></p>
                <p className='text-lg font-semibold'>Do you want to proceed ?</p>
            </Modal>
        </>
    )
}

export default BookConfirmModal