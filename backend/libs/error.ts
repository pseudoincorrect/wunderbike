module.exports = function ErrorMiddleware(err: any, req: any, res:any, next: any) {
  res.status(err.status);
  res.json(err);
  // next(err);
};
