import React, { useState } from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';
// Regular Product Status Update Autometically
import ProductUpdate from 'hooks/productUpdate';
//Book Modals
import BookModal from 'components/Modals/BookModal';
// Return Modals
import ReturnModal from 'components/Modals/ReturnModal';
// Table
import ProductTable from 'components/Tables/ProductTable';
// Layout
import Header from 'components/Wizard/Header/Header';
import Footer from 'components/Wizard/Footer/Footer';
// Errorboundary
import ErrorBoundary from 'utils/ErrorBoundary';
const Products = () => {
  // Update Product Everyday
  const today = moment().format('l');
  ProductUpdate(today);

  const [book, setBook] = useState(false);
  const [returns, setReturn] = useState(false);
  return (
    <>
      <Row justify="center">
        <Col xs={20} sm={20} md={16} lg={16} xl={16}>
          <ErrorBoundary>
            <Header title="Rental Software" subTitle="Line Reflection Ltd." />
          </ErrorBoundary>
        </Col>
        <Col xs={20} sm={20} md={16} lg={16} xl={16}>
          <ErrorBoundary>
            <ProductTable
              setBook={(val) => setBook(val)}
              setReturn={(val) => setReturn(val)}
            />
          </ErrorBoundary>
        </Col>
        <Col span={24}>
          <ErrorBoundary>
            <Footer credit="shovon" />
          </ErrorBoundary>
        </Col>
      </Row>

      {/* Book & Return Modal */}
      <ErrorBoundary>
        <BookModal visible={book} setBook={(val) => setBook(val)} />
      </ErrorBoundary>
      <ErrorBoundary>
        <ReturnModal visible={returns} setReturn={(val) => setReturn(val)} />
      </ErrorBoundary>
    </>
  );
};

export default Products;
