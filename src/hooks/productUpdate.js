import {useEffect} from 'react';
import { useDispatch } from 'react-redux';

export default function ProductUpdate(date) {
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch({ type: "products/updateProducts", payload: { date } })
    }, [date]);
}