import React from 'react';
const ConfirmDialogue = ({ selected }) => {
  return (
    <>
      <p className="text-xl">
        Your Estimated Price is{' '}
        <span className="font-bold text-blue-600">${selected.estPrice}</span>
      </p>
      <p className="text-lg font-semibold">Do you want to proceed ?</p>
    </>
  );
};

export default ConfirmDialogue;
