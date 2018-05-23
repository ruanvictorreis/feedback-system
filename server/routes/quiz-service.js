var express = require('express');
var router = express.Router();

router.post('/', function (request, response) {
    const data = request.body;
    const register = data.register;
    const assignment = data.assignment;

    const proportionList = [(4, 0), (3, 1), (2, 2), (1, 3), (0, 4)];
    const proportion = proportionList[Math.floor(Math.random * proportionList.length)];

    const specsPath = `./assignments/${assignment}/specs/`;
    const tricksPath = `./assignments/${assignment}/tricks/`;
    

});


module.exports = router;