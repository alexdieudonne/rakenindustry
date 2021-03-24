import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import Returns from '../models/returnModel.js';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';
import _ from "lodash"

const returnRouter = express.Router();

returnRouter.get(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const returns = await Returns.find({ 'user': req.user._id });
        // const orders = await Order.findById(req.params.id);
        var returnArray = []
        function getUniqueListBy(arr, key) {
            return [...new Map(arr.map(item => [item[key], item])).values()]
        }
        
        for (var i = 0; i < returns.length; i++) {
            // var items = [...returns[i].article]
            returns[i].article.map(async (v) => {
                const orders = await Order.find({ user: req.user._id, _id: returns[i].order })
                //console.log(order)
                orders.forEach(element => {
                    element.orderItems.map(async (order, g) => {
                        try {
                            const orderItems = await Product.findById(order.product_id);
                               //var orders = orderItems.filter((v, i, a) => a.findIndex(t => (t._id === v._id)) === i)
                        // console.log(orders)
                        returnArray.push({
                            order: returns[i].order,
                            status: returns[i].status,
                            product_id: element.orderItems[g]._id,
                            price: orderItems.price,
                            image: orderItems.image[0][0].thumbnail,
                            name: orderItems.name,
                            qty: element.orderItems[g].qty,
                            size: element.orderItems[g].size,
                            color: element.orderItems[g].color,
                            date: element.createdAt
                        })  
                        } catch (error) {
                            console.log(error)
                        }
                       
                   
                    })

                });
            })
            for (var g = 0; g < returns[i].article.length; g++) {
                const orders = await Order.findOne({ user: req.user._id, _id: returns[i].order });
            }
            // returnArray[i] = {}
            const order = await Order.find({ user: req.user._id, _id: returns[i].order })
        }
        const newreturnArray = getUniqueListBy(returnArray, 'name');

        var grouped = _.mapValues(_.groupBy(newreturnArray, 'order'),
                clist => clist.map(car => _.omit(newreturnArray, 'order')));

        let wholeArray = Object.keys(grouped).map(key => grouped[key]);
        res.send(newreturnArray);
    })
);

returnRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        if (req.user._id.match(/^[0-9a-fA-F]{24}$/)) {
            //  adress = Returns.findOne({ _id: req.params.id }, { user: req.user._id });
            const adresses = await Returns.findById(req.params.id);
            if (adresses.user == req.user._id) {
                res.send(adresses);
            } else {
                res.status(400)
                res.send({ error: "Returns Introuvable " })
            }
        }
    })
);

returnRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        // console.log(req.body.category, req.body.order, req.user._id)
        //const product = await Product.findById(req.body.article[i])

        if (!req.body.reasons || !req.user || !req.body.order || !req.body.article) {
            res.status(400)
            res.send({ error: "Impossible place return" })
            return;
        } else {
            if (!req.body.order.match(/^[0-9a-fA-F]{24}$/)) {
                res.status(400)
                res.send({ error: "Impossible place return" })
                return;
            }
            // console.log("article", req.body)
            const order = await Order.findOne({ _id: req.body.order })
            var found = false

            for (var i = 0; i < req.body.article.length; i++) {
                var foind = order.orderItems.findIndex(x => x.product_id === req.body.article[i]);
                found = foind;
                //console.log(foind)
            }

            const return_ = await Returns.find({ order: req.body.order })

            if (found == false) {
                //console.log(found)
                res.status(400)
                res.send({ error: "Une erreur s'est produite" })
                return;
            } else if (return_.length > 0) {
                for (var i = 0; i < return_.length; i++) {
                    for (var g = 0; g < return_[i].article.length; g++) {
                        var foind = req.body.article.findIndex(x => x === return_[i].article[g].name);

                        if (foind == 0) {
                            //console.log(return_[i].article[g].name)
                            res.status(400)
                            res.send({ error: "retour déjà placé" })
                            return null;
                        }
                    }
                    console.log(foind)
                }
            }


            const orderOwner = await Order.find({ user: req.user._id, _id: req.body.order })

            if (orderOwner.length > 0) {

                const article = req.body.article.map((v) => { return { name: v } })
                const returns = new Returns({
                    reason_more: req.body.reason_more,
                    reason: req.body.reasons,
                    user: req.user._id,
                    article: article,
                    order: req.body.order
                })

                try {
                    // console.log("here")
                    await returns.save()
                    res.status(200)
                    res.send({
                        message: "return placed successfullly"
                    });
                }
                catch (e) {
                    console.log(e)
                    res.status(400).send({ message: "une erreur s'est produite" })
                }
            } else {
                res.status(401).send({ message: "retour déjà placé" })
            }
        }

    })
);


returnRouter.delete(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        if (req.user._id.match(/^[0-9a-fA-F]{24}$/)) {
            //  adress = Returns.findOne({ _id: req.params.id }, { user: req.user._id });
            const adresse = await Returns.findById(req.params.id);

            if (adresse.user == req.user._id) {
                await adresse.remove();
                const adresses = await Returns.find({ 'user': req.user._id });
                res.status(200)
                res.send({ message: 'Returns Deleted', adress: adresses });
            } else {
                res.status(400)
                res.send({ error: "Returns Introuvable " })
            }
        }
    })
);



export default returnRouter;
