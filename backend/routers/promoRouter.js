import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Adresse from '../models/adresseModel.js';
import Promo from '../models/promoModel.js';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';

const promoRouter = express.Router();

promoRouter.get(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {

        const adresses = await Adresse.find({ 'user': req.user._id });
        res.send(adresses);
    })
);

promoRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        if (!req.body.code ||  !req.body.endTime) {
            res
                .status(401)
                .send({ error: "manque des options" });
            return;
        }
        else {
            try {
                const promo = new Promo({
                    code: req.body.code ,
                    endTime :req.body.endTime ,
                });
                const addPromo = await promo.save();
                res
                    .status(201)
                    .send({ message: 'New promo code created', promo: addPromo });
            }
            catch (e) {
                //  console.error(e.message)
                res
                    .status(401)
                    .send({ error: e.message });
            }
        }

    })
);



promoRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {

        } else {
            res.status(400)
            res.send({ error: "Adresse Introuvable " })
        }
    })
);



promoRouter.delete(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        if (req.user._id.match(/^[0-9a-fA-F]{24}$/)) {
            //  adress = Adresse.findOne({ _id: req.params.id }, { user: req.user._id });
            const adresse = await Adresse.findById(req.params.id);

            if (adresse.user == req.user._id) {
                await adresse.remove();
                const adresses = await Adresse.find({ 'user': req.user._id });
                res.status(200)
                res.send({ message: 'Promo code Deleted', adress: adresses });
            } else {
                res.status(400)
                res.send({ error: "Promo code introuvable " })
            }
        }
    })
);



export default promoRouter;
