const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Product = require("../models/Product");
// @desc Get all products
// @route GET /api/v1/products
// @access Public

// Use the async handler to help resolve promises
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

  // If there is no product with passed id
  // return next with a new Error response
  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  // Otherwise return success with product 
  res.status(200).json({ success: true, data: product });
});

// @desc Create new product
// @route POST /api/v1/products
// @access Private

exports.createProduct = asyncHandler(async (req, res, next) => {
  // save new product in a variable
  const product = req.body;
  // set the body user id to the user id
  req.body.userId = req.user.id;

  // add new product to DB
  const addProduct = await Product.add(product);

  // Respond with success and added product
  res.status(200).json({ success: true, data: addProduct });
});

// @desc Update product
// @route PUT /api/v1/products/:id
// @access Private

exports.updateProduct = asyncHandler(async (req, res, next) => {
  // Save changes from body
  const changes = req.body;
  // Grab id from params and save it in a variable
  const id = req.params.id;

  // Check if Product exists
  let product = await Product.findById(id);

  // If it doesn't respond with an error message
  // and by calling next to proceed with the request
  if (!product) {
    return next(new ErrorResponse(`Product with ID ${id} does not exist`, 404));
  }
  
  // Make sure user is product owner
  if (product.userId !== req.user.id) {
    // If he's not, return an error saying he's not authorized to update the product
    return next(
      new ErrorResponse(`User not authorized to update this product`, 401)
    );
  }

  // Otherwise if he's authorized - Update Product
  const updatedProduct = await Product.update(changes, id);
  
  // Respond with success and updated product
  res.status(200).json({ success: true, data: updatedProduct });
});

// @desc Delete product
// @route DELETE /api/v1/products/:id
// @access Private

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  // Grab id from params
  const id = req.params.id;
  // Find product in db by passing the id
  let product = await Product.findById(id);
  // If product doesn't exist
  // Respond with error - product does not exist
  if (!product) {
    new ErrorResponse(`Product with ID ${id} does not exist`, 401);
  }

  // Make sure user is product owner
  if (product.userId !== req.user.id) {
    // If not, respond with error
    return next(new ErrorResponse(`Product with ID ${id} does not exist`, 401));
  }

  // Otherwise remove the product
  await Product.remove(id);

  // Respond with a success message saying product has been deleted
  res
    .status(200)
    .json({ success: true, msg: `Deleted product with ID: ${id}` });
});
