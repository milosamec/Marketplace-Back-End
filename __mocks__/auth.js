// Protect Routes Middleware
const protect = async () => {
  return await Promise.resolve({
    statusCode: 200,
  });
};

exports.protect = protect;
