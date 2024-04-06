const mongoose = require('mongoose');
const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour needs a name'],
    unique: true,
  },
  rating: {
    type: Number,
    required: [false, 'A tour needs a rating'],
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour needs a price'],
  },
});

const Tour = mongoose.model('Tour', toursSchema);

module.exports = Tour;
