import React, { FC } from 'react';
import { Form } from '~/pages/booking';

interface CustomerDetailProps {
  form: Form
  setForm: (prev: Form) => void
};

const CustomerDetail:FC<CustomerDetailProps> = ({form, setForm}) => {
  
  return (<div>CustomerDetail</div>)
};

export default CustomerDetail;