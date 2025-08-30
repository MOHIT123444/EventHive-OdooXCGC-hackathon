// src/utils/paymentGatewaySim.js
// Simulate a payment gateway behavior (use in testing/demo)

function simulatePayment({ amount }) {
  // fake delay & result
  return new Promise((resolve) => {
    setTimeout(() => {
      // simple deterministic success for demo
      resolve({ success: true, transactionId: 'TXN_' + Date.now() });
    }, 800);
  });
}

module.exports = { simulatePayment };
