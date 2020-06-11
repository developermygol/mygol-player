import stripeLoader from 'stripe-client';
import config from '../Config';
import { getOpErrorText } from '../components/Utils';

/*
    cardName: t.String,
    cardNumber: t.String, 
    cardExpiryMonth: t.Integer, 
    cardExporyYear: t.Integer,
    cardCcv: t.String, 
    address: t.maybe(t.String)
*/

const adaptFormToStripe = f => {
  // Remove spaces from card number
  const cardNumber = f.cardNumber.replace(/\s/g, '');

  return {
    card: {
      number: cardNumber,
      exp_month: f.cardExpiryMonth,
      exp_year: f.cardExpiryYear,
      cvc: f.cardCcv,
      name: f.cardName,
      //address: f.address
    },
  };
};

export const getStripeCardToken = async (state, paymentForm, stripePublicKey) => {
  try {
    if (state) state.loading = true;
    if (!stripePublicKey) throw new 'Error.OrgPaymentNotConfigured'();

    const stripe = stripeLoader(stripePublicKey);
    if (!stripe) throw new 'Error.OrgPaymentNotConfigured'();

    const data = adaptFormToStripe(paymentForm);
    const card = await stripe.createToken(data);
    return card;
  } catch (err) {
    if (state) state.error = getOpErrorText(err);
    state.loading = false;
    return null;
  } finally {
    if (state) state.loading = false;
  }

  return true;
};
