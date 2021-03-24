import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken, isAdmin, isAuth } from '../utils.js';
import Stripe from 'stripe'

const userRouter = express.Router();

userRouter.get(
  '/top-sellers',
  expressAsyncHandler(async (req, res) => {
    const topSellers = await User.find({ isSeller: true })
      .sort({ 'seller.rating': -1 })
      .limit(3);
    res.send(topSellers);
  })
);

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {

    var user = null;

    user = await User.findOne({ email: String(req.body.email) });

    var pass = false
    if (user) {
      pass = bcrypt.compareSync(String(req.body.password), String(user.password))
      if (bcrypt.compareSync(String(req.body.password), String(user.password))) {
        res.send({
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          newsletter: user.newsletter,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }

    res.status(401).send({ message: 'Invalid email or password', password: pass && !user ? '' : 'Mot de passe invalide', email: user ? '' : 'L\'email n\'existe pas' });
  }),

);

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {

    if (!req.body.email || !req.body.gender || !req.body.firstname
      || !req.body.lastname || !req.body.password) {
      return res.status(400).send("User cannot be created");
    }
    const { email } = req.body;
    const key = process.env.STRIPE_SECRET_KEY

    let userFound = await User.findOne({ email });
    if (userFound) return res.status(400).send("L'email existe déjà");

    const stripe = new Stripe(key);
    // const { token } = req.body

    stripe.customers.create({
      email: req.body.email,
      name: `${req.body.firstname} ${req.body.lastname}`,
    }).then(async (customer) => {
      const user = new User({
        gender: req.body.gender,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        birthday: req.body.birthday,
        customerID_stripe: customer.id,
        newsletter: req.body.newsletter
      });
      try {
        await user.save();
        // res.send({
        //   _id: createdUser._id,
        //   name: createdUser.name,
        //   email: createdUser.email,
        //   newsletter: createdUser.newsletter,
        //   token: generateToken(createdUser),
        // });
        res.send({ message: "Utilisateur enregistré" });
      }
      catch (e) {
       // console.log(e)
        res.status(400).send(e.message)
      }

    })
  })
);

userRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    var user = null;
    // console.log(req.headers)
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      user = await User.findById(req.params.id);
    }
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);


userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {

    var user = null;
    if (req.user._id.match(/^[0-9a-fA-F]{24}$/)) {
      user = await User.findById(req.user._id);
    }
    if (user) {
      user.firstname = req.body.firstname || user.firstname;
      user.lastname = req.body.lastname || user.lastname;
      user.email = req.body.email || user.email;
      user.newsletter = req.body.newsletter || user.newsletter;


      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }


      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        newsletter: updatedUser.newsletter,
        email: updatedUser.email,
        token: generateToken(updatedUser),
      });
    }
  })
);

userRouter.post(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    var user = null;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      user = await User.findById(req.params.id);
    }
    if (user) {
      if (req.body.adresse) {
        user.adresses = req.body.adresse
      }

      const updatedUser = await user.save();

      res.send({
        _id: updatedUser._id,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        newsletter: user.newsletter,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    }
  })
);


userRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);


userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = null;
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      user = await User.findById(req.params.id);
    }
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isSeller = Boolean(req.body.isSeller);
      user.isAdmin = Boolean(req.body.isAdmin);
      // user.isAdmin = req.body.isAdmin || user.isAdmin;
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

export default userRouter;
