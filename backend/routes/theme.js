const router = require('express').Router();
let Theme = require('../models/theme.model'); // We import the Theme model


router.route('/').get((req, res) => {
  Theme.find()
    .then(themes => res.json(themes))
    .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;