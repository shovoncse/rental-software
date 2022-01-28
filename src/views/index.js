import React, { useState } from 'react'
import { Row, Col } from 'antd';
import moment from 'moment';
import ProductUpdate from 'hooks/productUpdate'
//Book Modals
import BookModal from 'components/Modals/BookModal';
import BookConfirmModal from 'components/Modals/BookConfirmModal';
// Return Modals
import ReturnModal from 'components/Modals/ReturnModal';
import ReturnConfirmModal from 'components/Modals/ReturnConfirmModal';
// Table
import ProductTable from 'components/Tables/ProductTable';
import Header from 'components/Wizard/Header/Header';
import Footer from 'components/Wizard/Footer/Footer';

const Products = () => {

    const [bookModalVisible, setBookModalVisible] = useState(false)
    const [bookConfirmModalVisible, setBookConfirmModalVisible] = useState(false)
    const [returnModalVisible, setReturnModalVisible] = useState(false)
    const [returnConfirmModalVisible, setReturnConfirmModalVisible] = useState(false)
    
    const date = moment();
    ProductUpdate(date)

    return (
        <>
            <Row justify="center">
                <Col xs={20} sm={20} md={16} lg={16} xl={16}>
                    <Header title="Rental Software" subTitle="Line Reflection Ltd." />
                </Col>
                <Col xs={20} sm={20} md={16} lg={16} xl={16}>
                    <ProductTable setBookModal={(val) => setBookModalVisible(val)} setReturnModal={(val) => setReturnModalVisible(val)} />
                </Col>
                <Col span={24}>
                    <Footer credit="shovon" />
                </Col>
            </Row>


            {/* Book Modal */}
            <BookModal visible={bookModalVisible} setBookModal={(val) => setBookModalVisible(val)} setConfirmModal={(val) => setBookConfirmModalVisible(val)} />

            {/* book confirm */}
            <BookConfirmModal visible={bookConfirmModalVisible} setConfirmModal={(val) => setBookConfirmModalVisible(val)} setBookModal={(val) => setBookModalVisible(val)} />

            {/* Return Modal */}
            <ReturnModal visible={returnModalVisible} setReturnModal={(val) => setReturnModalVisible(val)} setConfirmModal={(val) => setReturnConfirmModalVisible(val)} />

            {/* Return confirm */}
            <ReturnConfirmModal visible={returnConfirmModalVisible} setConfirmModal={(val) => setReturnConfirmModalVisible(val)} setReturnModal={(val) => setReturnModalVisible(val)} />

        </>
    )
}

export default Products;