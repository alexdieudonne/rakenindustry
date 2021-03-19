import { RAKEN_URL } from "./Functions";

const createPaymentIntent = (options:any) => {
    return window
      .fetch(`${RAKEN_URL}/api/orders/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(options)
      })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then(data => {
        if (!data || data.error) {
          console.log("API error:", { data });
          throw new Error("PaymentIntent API Error");
        } else {
          return data.client_secret;
        }
      });
  };

  const getPublicStripeKey = (options:any) => {
    return window
      .fetch(`/public-key`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return null;
        }
      })
      .then(data => {
        if (!data || data.error) {
          console.log("API error:", { data });
          throw Error("API Error");
        } else {
          return data.publicKey;
        }
      });
  };
  
  const api = {
    createPaymentIntent,
    getPublicStripeKey,
  };
  
  export default api;