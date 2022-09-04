let sendResponse = {
  success: (res, data) => {
    res.status(200).send({
      data: data,
    });
  },
  serverError: (res, info) => {
    res.status(500).send(info);
  },
  badRequest: (res, info) => {
    res.status(400).send(info);
  },
};
module.exports = sendResponse;
