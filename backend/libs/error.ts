function errorMid(error: any, req: any, res: any, next: any) {
  console.log(`error ${error.message}`); // log the error
  const status = error.status || 400;
  res.status(status).json({ message: error.message });
}

export { errorMid };
