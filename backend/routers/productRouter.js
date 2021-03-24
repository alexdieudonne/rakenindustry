import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import Stripe from 'stripe'
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';

const productRouter = express.Router();

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const pageSize = Number(req.query.limit);
    const page = Number(req.query.pageNumber) || 1;
    const name = req.query.name || '';
    const category = req.query.category || '';
    const seller = req.query.seller || '';
    const order = req.query.order || '';
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const sellerFilter = seller ? { seller } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
          ? { price: -1 }
          : order === 'toprated'
            ? { rating: -1 }
            : { _id: -1 };
    const count = await Product.count({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    const products = await Product.find({
      ...nameFilter,
      ...priceFilter,
    })
      .populate('seller', 'seller.name seller.logo')
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize ? pageSize : 0);

    res.send({ products, page, pages: Math.ceil(count / pageSize) });
  })
);

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

productRouter.get(
  '/random',
  expressAsyncHandler(async (req, res) => {

    const product = await Product.find().limit(8)
    shuffle(product)
    // const categories = await Product.find().distinct('category');
    res.send(product);
  })
);

productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    req.status(404).send("")
    return;
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);

productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Product.remove({});
    const products = data.products.map((product) => ({
      ...product,
    }));
    const createdProducts = await Product.insertMany(products);
    res.send({ createdProducts });
    // } else {
    // res
    //   .status(500)
    //   .send({ message: 'No seller found. first run /api/users/seed' });
  }
  )
);

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      const product = await Product.findById(req.params.id).populate(
        'seller',
        'seller.name seller.logo seller.rating seller.numReviews'
      );
      if (product) {
        res.send(product);
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    } else {
      res.status(401).send({ message: 'Error' });
    }

  })
);

productRouter.post(
  '/',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const key = process.env.STRIPE_SECRET_KEY

    if (req.body.product) {


      for (var i = 0; i < req.body.product.length; i++) {

        if (req.body.product[i].image && req.body.product[i].name && req.body.product[i].price && req.body.product[i].countInStock && req.body.product[i].description && req.body.product[i].size) {
          const stripe = new Stripe(key);

          if (req.body.product[i].image[0][0]?.thumbnail &&
            req.body.product[i].image[0][0]?.original &&
            req.body.product[i].image[0][0]?.color &&
            req.body.product[i].size[0]?.value &&
            req.body.product[i].size[0]?.quantity) {
            const produit = await Product.find({ name: req.body.product[i].name });
            // console.log(produit)
            if (produit.length <= 0) {

              const stripeOroduct = await stripe.products.create({

                name: req.body.product[i].name,
                type: "good",
                description: req.body.product[i].description,
                images: [req.body.product[i].image[0][0].original],
              })

              const stripeSkus = await stripe.skus.create({
                price: req.body.product[i].price * 100,
                currency: 'eur',
                inventory: { type: 'finite', quantity: req.body.product[i].countInStock },
                product: stripeOroduct.id,
              }).catch(e =>
                res.status(400).send({ message: e.message })
              )
              try {
                const product = new Product({
                  name: req.body.product[i].name,
                  price: req.body.product[i].price,
                  size: req.body.product[i].size,
                  image: req.body.product[i].image,
                  countInStock: req.body.product[i].countInStock,
                  description: req.body.product[i].description,
                  productID_stripe: stripeOroduct.id,
                  skuID_stripe: stripeSkus.id
                })

                const createdProduct = await product.save();

                if (i + 1 == req.body.product.length) {
                  product
                  res.status(200).send({
                    message: 'Products Created',
                  });
                }

              } catch (e) {
                res.status(400).send({ message: e.message });
                return;
              }

            } else {
              res.status(400).send({ message: `Product ${req.body.product[i].name} already added try change the name` });
            }
          } else {
            res.status(400).send({ message: 'Fields missing' });
          }
        } else {
          res.status(400).send({ message: 'Fields missing' });
        }
      }

    } else {
      res.status(400).send({ message: 'Fields missing' });
    }

  })
);

productRouter.put(
  '/:id',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res.send({ message: 'Product Updated', product: updatedProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    if (req.params?.id.match(/^[0-9a-fA-F]{24}$/)) {
      const product = await Product.findById(req.params.id);
      if (product) {
        const deleteProduct = await product.remove();
        res.send({ message: 'Product Deleted', product: deleteProduct });
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    }

  })
);

// productRouter.post(
//   '/:id/reviews',
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const productId = req.params.id;
//     const product = await Product.findById(productId);
//     if (product) {
//       if (product.reviews.find((x) => x.name === req.user.name)) {
//         return res
//           .status(400)
//           .send({ message: 'You already submitted a review' });
//       }
//       const review = {
//         name: req.user.name,
//         rating: Number(req.body.rating),
//         comment: req.body.comment,
//       };
//       product.reviews.push(review);
//       product.numReviews = product.reviews.length;
//       product.rating =
//         product.reviews.reduce((a, c) => c.rating + a, 0) /
//         product.reviews.length;
//       const updatedProduct = await product.save();
//       res.status(201).send({
//         message: 'Review Created',
//         review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
//       });
//     } else {
//       res.status(404).send({ message: 'Product Not Found' });
//     }
//   })
// );

export default productRouter;
