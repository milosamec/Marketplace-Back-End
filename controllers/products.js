const asyncHandler = require("../middleware/async");
const Product = require("../models/Product");
// @desc Get all products
// @route GET /api/v1/products
// @access Public

exports.getProducts = asyncHandler(async (req, res, next) => {
  // Find all products in Database
  const products = await Product.findAll();

  res.status(200).json({ success: true, data: products });
});

// @desc Get product by id
// @route GET /api/v1/products/:id
// @access Public

exports.getProduct = asyncHandler(async (req, res, next) => {
  // Destructure params
  const id = req.params.id;

  // Find product in Database by Id
  const product = await Product.findById(id);

  if (!product) {
    return res.status(401).json({ msg: `Product not found with id of ${id}` });
  }

  res.status(200).json({ success: true, data: product });
});

// @desc Create new product
// @route POST /api/v1/products
// @access Private

exports.createProduct = asyncHandler(async (req, res, next) => {
  const product = req.body;
  req.body.userId = req.user.id;

  const addProduct = await Product.add(product);

  res.status(200).json({ success: true, data: addProduct });
});

// @desc Update product
// @route PUT /api/v1/products/:id
// @access Private

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const changes = req.body;
  const id = req.params.id;

  // Check if Product exists
  let product = await Product.findById(id);

  if (!product) {
    return res
      .status(401)
      .json({ msg: `Product with ID ${id} does not exist` });
  }

  // Make sure user is product owner
  if (product.userId !== req.user.id) {
    return res
      .status(401)
      .json({ msg: `User not authorized to update this product` });
  }

  // Update Product
  const updatedProduct = await Product.update(changes, id);

  res.status(200).json({ success: true, data: updatedProduct });
});

// @desc Delete product
// @route DELETE /api/v1/products/:id
// @access Private

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let product = await Product.findById(id);
  if (!product) {
    return res
      .status(401)
      .json({ msg: `Product with ID ${id} does not exist` });
  }

  // Make sure user is product owner
  if (product.userId !== req.user.id) {
    return res
      .status(401)
      .json({ msg: `User not authorized to delete this product` });
  }

  await Product.remove(id);

  res
    .status(200)
    .json({ success: true, msg: `Deleted product with ID: ${id}` });
});
