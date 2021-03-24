import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Adresse from '../models/adresseModel.js';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';

const adressRouter = express.Router();

adressRouter.get(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {

        const adresses = await Adresse.find({ 'user': req.user._id });
        res.send(adresses);
    })
);

adressRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        if (req.user._id.match(/^[0-9a-fA-F]{24}$/)) {
            //  adress = Adresse.findOne({ _id: req.params.id }, { user: req.user._id });
            const adresses = await Adresse.findById(req.params.id);
            if (adresses.user == req.user._id) {
                res.send(adresses);
            } else {
                res.status(400)
                res.send({ error: "Adresse Introuvable " })
            }
        }
    })
);

adressRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        try {
            const adress = new Adresse({
                alias: req.body.alias ? req.body.alias : `Adresse ${req.body.city} `,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                zip_code: req.body.zip_code,
                city: req.body.city,
                country: req.body.country,
                phone_number: req.body.phone_number,
                user: req.user._id,
                adress: req.body.adress,
                adress_more: req.body.adresse_more,
                more_info: req.body.more_info,
            });
            const addAdress = await adress.save();
            res
                .status(201)
                .send({ message: 'New Adress Created', adress: addAdress });
        }
        catch (e) {
          //  console.error(e.message)
            res
                .status(401)
                .send({ error: e.message });
        }

    })
);


adressRouter.put(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            const adresseId = await Adresse.findById(req.params.id);
            Adresse.findOne({ _id: req.params.id }, function (err, adresse) {
                if (!err && adresse) {
                    Adresse.findOne({ user: req.user._id }, async function (error, user) {
                        if (!error && user) {

                            adresseId.alias = req.body.alias ? req.body.alias : `${"Adresse" + adresse._id} `
                            adresseId.firstname = req.body.firstname,
                                adresseId.lastname = req.body.lastname,
                                adresseId.zip_code = req.body.zip_code,
                                adresseId.city = req.body.city,
                                adresseId.country = req.body.country,
                                adresseId.phone_number = req.body.phone_number,
                                adresseId.user = req.user._id,
                                adresseId.adress = req.body.adress,
                                adresseId.adress_more = req.body.adress_more,
                                adresseId.more_info = req.body.more_info;
                            try {
                                const addAdress = await adresseId.save();
                                res
                                    .status(200)
                                    .send({ message: 'Adress modified', adress: addAdress });
                            } catch (e) {
                                res
                                    .status(401)
                                    .send({ error: e.message });

                            }

                        } else {
                            res.status(403).send({ message: 'Vous n\'avez pas le droit d\'accéder a cette ressource' });
                        }
                    });
                } else {
                    res.status(400)
                    res.send({ error: "Adresse Introuvable " })
                }
            });
        } else {
            res.status(400)
            res.send({ error: "Adresse Introuvable " })
        }
    })
);


adressRouter.delete(
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
                res.send({ message: 'Adresse Deleted', adress: adresses });
            } else {
                res.status(400)
                res.send({ error: "Adresse Introuvable " })
            }
        }
    })
);



export default adressRouter;
