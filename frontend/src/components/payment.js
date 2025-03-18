import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your_stripe_publishable_key');

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8000/api/payment/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Token ${token}` },
      body: JSON.stringify({ amount: 1000 }), // $10
    });
    const { client_secret } = await response.json();

    const result = await stripe.confirmCardPayment(client_secret, {
      payment_method: { card: elements.getElement(CardElement) },
    });

    if (result.error) alert(result.error.message);
    else alert('Payment successful!');
  };

  return (
    <div className="container">
      <CardElement />
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
}

function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}

export default Payment;
