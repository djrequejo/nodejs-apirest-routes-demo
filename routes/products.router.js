const express = require('express');
const ProductsService = require('../services/product.service');
const { validatorHandler } = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('I\'m a filter');
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const product = await service.findOne(id);
      res
        .status(200)
        .json(product);
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const product = await service.create(body);
    res
      .status(201)
      .json({
        message: 'created',
        data: product
      });
  });

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    const { id } = req.params;
    const body = req.body;

    try {
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      next(error);
    }
  });

router.put('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    try {
      const product = await service.update(id, body);
      res.json(product);
    } catch (error) {
      res
        .status(404)
        .json({
          message: error.message
        })
    }
  });

router.delete('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res) => {
    const { id } = req.params;

    try {
      const product = await service.delete(id);
      res.json(product);
    } catch (error) {
      res
        .status(404)
        .json({
          message: error.message
        })
    }
  });

module.exports = router;


