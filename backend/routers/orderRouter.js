import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';
import Stripe from 'stripe'
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Adresse from '../models/adresseModel.js';
import { v4 as uuid } from "uuid";



const orderRouter = express.Router();

orderRouter.get(
  '/',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const seller = req.query.seller || '';
    const sellerFilter = seller ? { seller } : {};
    const orders = await Order.find({ ...sellerFilter }).populate(
      'user',
      'name'
    );
    res.send(orders);
  })
);

orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    var ordersList = []

    // ordersList.orderItems = []

    for (var a = 0; a < orders.length; a++) {
      var orderItem = []
      for (var g = 0; g < orders[a].orderItems.length; g++) {
        const orderItems = await Product.findById(orders[a].orderItems[g].product_id);
        orderItem.push({
          product_id: orders[a].orderItems[g]._id,
          name: orderItems.name,
          status: orders[a].status,
          price: orderItems.price,
          qty: orders[a].orderItems[g].qty,
          size: orders[a].orderItems[g].size,
          color: orders[a].orderItems[g].color,
          date: orders[a].createdAt
        })
      }
      ordersList.push({ ...{ order_id: orders[a]._id }, orderItem })
    }
    res.send(ordersList);
  })
);


orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    //cons
    const key = process.env.STRIPE_SECRET_KEY
    const idempotencyKey = uuid()
    if (req.body.orderItems && req.body.shippingAddress && req.body.paymentMethod && req.body.token) {
      var cartItems = []
      var productItems = []
      var orderItems = []
      var adresse = null
      const user = await User.findById(req.user._id)


      try {
        if (req.body.orderItems[0]?.id && req.body.orderItems[0]?.qty && req.body.orderItems[0]?.color && req.body.orderItems[0]?.size) {
          for (var i = 0; i < req.body.orderItems.length; i++) {
            const product = await Product.findById(req.body.orderItems[i].id)
            // console.log(product)
            productItems.push({ ...product, price: product.price, qty: req.body.orderItems[i].qty })

            let hasMagenicVendor = product.size.some(product => product['value'] === req.body.orderItems[i].size)

            let hasImage = product.image[0].some(product => product['color'] === req.body.orderItems[i].color)

            if (!hasImage || !hasMagenicVendor) {
              throw new Error("les datas envoyés sont éronnés");
            } else {
              cartItems.push({ product_id: req.body.orderItems[i].id, qty: req.body.orderItems[i].qty, size: hasMagenicVendor ? req.body.orderItems[i].size : product.size[0].value, color: req.body.orderItems[i].color })
            }
            orderItems.push({ currency: 'eur', amount: product.price, description: product.name, quantity: req.body.orderItems[i].qty, type: "sku", parent: product.skuID_stripe })
          }

          const adresses = await Adresse.findById(req.body.shippingAddress)

          if (req.user._id == adresses.user) {
            adresse = adresses
          }
        } else {
          res.status(400).send({ message: "some fields are required" });
          return null;
        }

      } catch (e) {
        // console.log(e.message)
        res.status(400).send({ message: e.message });
        return null;
      }

      // console.log(orderItems)

      if (adresse) {
        if (req.body.orderItems.length === 0) {
          res.status(400).send({ message: 'Cart is empty' });
        } else {
          const totalPrice = productItems.reduce((a, c) => a + c.price * c.qty, 0)

          const order = new Order({
            orderItems: cartItems,
            shippingAddress: { adresse_id: req.body.shippingAddress },
            paymentMethod: req.body.paymentMethod,
            totalPrice: totalPrice,
            user: req.user._id,
          });


          const stripe = new Stripe(key);
          const { token } = req.body
          const { clientSecret } = req.body

          console.log(clientSecret)


          stripe.paymentIntents.confirm(clientSecret,
            {
              // amount: totalPrice * 100,
              // currency: 'eur',
              // customer: customer.id,
              receipt_email: token.email,
              // payment_method: token.id,
              payment_method_data: { type: "card", card: { token: token.id } },
              // description: `<td>purchase of"</td> : <td>"300"</td> \n
              // "poulet" => 300`,
              shipping: {
                name: token.card.name,
                address: {
                  country: adresse.country,
                  line1: adresse.adress,
                  line2: adresse.more_info,
                  postal_code: adresse.zip_code,
                  city: adresse.city,
                }
              }
            }, { idempotencyKey }).catch((err) => {
              res.send(err)
              return null;   // If some error occurs 
            }).then(async (charge) => {
              if (charge) {
                res
                  .status(201)
                  .send({ message: charge, order: createdOrder });
              } else {
                res.status(501).send({ message: "une erreur s'est prouite" });
              }
              return null;
            })

        }
      }
    } else {
      res.status(404).send({ message: "Une erreur s'est produite" });
      return null;
    }

  })
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.findById(req.params.id);
    var sendOrder = []
    // console.log(orders)
    if (orders) {
      var ordersList = []

      ordersList.orderItems = []

      var orderItem = []
      for (var g = 0; g < orders.orderItems.length; g++) {
        const orderItems = await Product.findById(orders.orderItems[g].product_id);
        orderItem.push({
          product_id: orders.orderItems[g].product_id,
          name: orderItems.name,
          price: orderItems.price,
          qty: orders.orderItems[g].qty,
          image: orderItems.image[0][0].thumbnail,
          size: orders.orderItems[g].size,
          color: orders.orderItems[g].color,
          date: orders.createdAt
        })
      }
      ordersList.push({ order_id: orders._id, orderItem })

      res.send(ordersList[0]);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.post("/create-payment-intent", async (req, res) => {
  const body = req.body;
  const options = {
    payment_method_types: body.payment_method_types,
    amount: body.price * 100,
    currency: "EUR"
  };
  const key = process.env.STRIPE_SECRET_KEY
  const stripe = new Stripe(key);

  try {
    const paymentIntent = await stripe.paymentIntents.create(options);
    // console.log(paymentIntent)
    res.json(paymentIntent);
  } catch (err) {
    // console.log(err)
    res.json(err);
  }
});

orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };
      const updatedOrder = await order.save();
      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      const deleteOrder = await order.remove();
      res.send({ message: 'Order Deleted', order: deleteOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put(
  '/:id/deliver',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.send({ message: 'Order Delivered', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

export default orderRouter;
