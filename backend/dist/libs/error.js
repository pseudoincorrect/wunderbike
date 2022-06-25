"use strict";
module.exports = function ErrorMiddleware(err, req, res, next) {
    res.status(err.status);
    res.json(err);
    // next(err);
};
