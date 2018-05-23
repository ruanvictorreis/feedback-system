var fs = require('fs');
var express = require('express');
var router = express.Router();

router.post('/', function (request, response) {
    const data = request.body;
    const register = data.register;
    const assignment = data.assignment;

    const proportionList = [(4, 0), (3, 1), (2, 2), (1, 3), (0, 4)];
    const proportion = proportionList[Math.floor(Math.random * proportionList.length)];

    var specList = [];
    const specsPath = `./assignments/${assignment}/specs/`;

    var trickList = [];
    const tricksPath = `./assignments/${assignment}/tricks/`;

    fs.readdirSync(specsPath).forEach(file => {
        const content = fs.readFileSync(specsPath + file, 'utf-8');
        specList.push(content);
    });

    fs.readdirSync(tricksPath).forEach(file => {
        const content = fs.readFileSync(tricksPath + file, 'utf-8');
        trickList.push(content);
    });

    specList.sort(function () { return Math.round(Math.random()); });
    trickList.sort(function () { return Math.round(Math.random()); });

    var items = [];

    for (var i = 0; i < proportion[0]; i++) {
        var item = {};
        item.code = specList.pop();
        item.isCorrect = true;
        items.push(item);
    }

    for (var i = j; j < proportion[1]; j++) {
        var item = {};
        item.code = trickList.pop();
        item.isCorrect = false;
        items.push(item);
    }

    items.sort(function () { return Math.round(Math.random()); });

    var quiz = {};
    quiz.register = register;
    quiz.assignment = assignment;
    quiz.items = items;

    response.json(quiz);
});


module.exports = router;