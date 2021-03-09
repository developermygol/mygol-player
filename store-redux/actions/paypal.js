import axios from '../../axios';

export const createPaypalOrder = async () => {
  try {
    const { data } = await axios.post('/paypal/createorder');
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const capturePaypalOrder = async orderId => {
  try {
    const { data } = await axios.get(`/paypal/capture/${orderId}`);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getPaymentGetawayType = async () => {
  try {
    const { data } = await axios.get('/paypal/paymentgetawaytype');
    return data;
  } catch (err) {
    console.error(err);
  }
};
