import React, { useEffect, useState } from "react";
import ReservationForm from "../../ReservationForm/ReservationForm";
import { useParams } from 'react-router-dom'

const EditReservation = () => {
    const { id } = useParams();
    const [customerInfo, setCustomerInfo] = useState();

    useEffect(() => {
        loadReservation();
    },[]);

    const loadReservation = async () => {
        const result = await fetch(`/reservations/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const { data } = await result.json();
        setCustomerInfo(data[0]);
    }
    
  return <ReservationForm customerInfo={customerInfo} />;
};

export default EditReservation;

