const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { getTransactions, addTransaction, deleteTransaction } = require('../controllers/transactions');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Transaction = require('../models/Contact');


router
  .route('/')
  .get(auth, getTransactions)
//.post(auth, addTransaction);


// @route     POST api/contacts
// @desc      Add new contact
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, amount } = req.body;

    try {
      const newTransaction = new Transaction({
        name,
        amount,
        user: req.user.id
      })
      const transaction = await newTransaction.save();

      return res.status(201).json({
        success: true,
        data: transaction
      });
    } catch (err) {
      if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);

        return res.status(400).json({
          success: false,
          error: messages
        });
      } else {
        return res.status(500).json({
          success: false,
          error: 'Server Error'
        });
      }
    }
  },
);


router.delete('/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found'
      });
    }

    // Make sure user owns contact
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Transaction.findByIdAndRemove(req.params.id);

    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});


// router
//   .route('/:id')
//   .delete(auth, deleteTransaction);

module.exports = router;