// Express doesn't support async await by default
// This is a handy snippet of code enabling async await usage within express route handlers

const asyncHandler = (fn) => (req, res, next) => {
  // We use Promise.resolve to 
  Promise.resolve(fn(req, res, next)).catch(next);
};
module.exports = asyncHandler;
