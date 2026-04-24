const notFoundMiddleware = (req, res, _next) => {
  res.status(404).json({
    status: 'fail',
    message: 'Route not found',
  });
};

export { notFoundMiddleware };