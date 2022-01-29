import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function ProductUpdate(today) {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'products/updateProducts', payload: { today } });
  }, [today, dispatch]);
}
