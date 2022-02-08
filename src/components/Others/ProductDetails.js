import React from 'react';
import { List } from 'antd';
const ProductDetails = ({ selected }) => {
  return (
    <>
      <List size="small" bordered className="bg-sky-100">
        <List.Item key={1}>
          <span className="text-sm font-bold">{selected.name}</span>
        </List.Item>
        {selected.bookingsDays ? (
          <List.Item key={2}>
            <span className="font-bold">Bookd for:</span>{' '}
            {selected.bookingsDays} Days <br />
            <span className="font-bold">Period:</span>{' '}
            {selected.bookingsDates
              ? selected.bookingsDates[0] + ' to ' + selected.bookingsDates[1]
              : 'Not Found'}
            <br />
            <span className="font-bold">Mileage:</span> {selected.mileage || 0}
          </List.Item>
        ) : (
          <List.Item key={2}>
            <span className="font-semibold">Mileage:</span>{' '}
            {selected.mileage || '0'} <br />
            <span className="font-semibold">Price:</span> {selected.price}
            <br />
            <span className="font-semibold">Min Rent:</span> For{' '}
            <span className="font-bold">{selected.minimum_rent_period}</span>{' '}
            Day(s)
          </List.Item>
        )}
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
    </>
  );
};

export default ProductDetails;
