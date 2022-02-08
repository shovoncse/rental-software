import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Table, Input, Button } from 'antd';
import styles from './Table.module.css';

const ProductTable = ({ setBook, setReturn }) => {
  let productsData = useSelector((state) => state.products.products);
  const [products, setProducts] = useState(productsData);

  useEffect(() => {
    setProducts(productsData);
  }, [productsData]);

  // Search
  const filterVals = useCallback(
    (e) => {
      const currValue = e.target.value.toLowerCase();
      setVal(currValue);
      const filteredVals = productsData.filter((entry) =>
        entry.name.toLowerCase().includes(currValue)
      );
      setProducts(filteredVals);
    },
    [productsData]
  );

  //Columns
  const columns = [
    {
      title: 'SL',
      key: 'sl',
      dataIndex: 'sl',
      render: (value, item, index) => (page - 1) * 10 + index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      render: (text) => <p className="font-bold uppercase">{text}</p>,
    },
    {
      title: 'Availability',
      dataIndex: 'availability',
      key: 'availability',
      render: (text) =>
        text ? (
          <p className="font-bold text-green-500">Available</p>
        ) : (
          <p className="font-bold text-red-500">Not Available</p>
        ),
    },
    {
      title: 'Need to Repair',
      dataIndex: 'needing_repair',
      key: 'needing_repair',
      render: (text) =>
        text ? (
          <p className="font-bold text-red-500">Yes</p>
        ) : (
          <p className="font-bold text-green-500">No</p>
        ),
    },
    {
      title: 'Durability',
      dataIndex: 'durability',
      key: 'durability',
    },
    {
      title: 'Mileage',
      dataIndex: 'mileage',
      key: 'mileage',
      render: (text) => Number(text) || '0',
    },
  ];

  const [page, setPage] = useState(1);
  const [val, setVal] = useState('');

  return (
    <>
      <Table
        dataSource={products}
        columns={columns}
        className={styles.table}
        bordered
        pagination={{
          defaultPageSize: 6,
          onChange(current) {
            setPage(current);
          },
        }}
        title={() => (
          <Row justify="space-between">
            <Col xs={24} xxs={24} sm={6}>
              <h2 className="text-lg font-bold">All Products</h2>
            </Col>
            <Col xs={24} xxs={24} sm={12} md={6}>
              <Input
                placeholder="Search for products"
                value={val}
                onChange={filterVals}
              />
            </Col>
          </Row>
        )}
        footer={() => (
          <Row justify="end" gutter={[16, 8]}>
            <Col>
              <Button
                className={styles.bgBlue}
                onClick={() => {
                  setBook(true);
                }}
              >
                Book
              </Button>
            </Col>
            <Col>
              <Button
                className={styles.bgRed}
                onClick={() => {
                  setReturn(true);
                }}
              >
                Return
              </Button>
            </Col>
          </Row>
        )}
      />
    </>
  );
};

export default ProductTable;
