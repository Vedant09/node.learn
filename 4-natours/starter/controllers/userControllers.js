const fs = require('fs');
const userRead = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/users.json`)
);

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    satus: 'success',
    results: userRead.length,
    data: {
      data: userRead,
    },
  });
};

exports.creatUser = (req, res) => {
  res.status(500).json({
    staus: 'error',
    message: 'This has not been applied',
  });
};

exports.getUser = (req, res) => {
  console.log(req.params);
  const id = req.params;
  const user = userRead.find((ele) => ele._id === id);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: {
      tours: user,
    },
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    staus: 'error',
    message: 'This has not been applied',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    staus: 'error',
    message: 'This has not been applied',
  });
};
