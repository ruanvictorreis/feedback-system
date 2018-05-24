var fs = require('fs');
var express = require('express');
var router = express.Router();

router.post('/', function (request, response) {
    const data = request.body;
    const register = data.register;
    const assignment = data.assignment;
    const proportionList = [[4, 0], [3, 1], [2, 2], [1, 3], [0, 4]];

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

    shuffle(specList);
    shuffle(trickList);

    //Twice!!
    shuffle(proportionList);
    shuffle(proportionList);

    var items = [];
    var proportion = proportionList[Math.floor(Math.random() * proportionList.length)];

    for (var i = 0; i < proportion[0]; i++) {
        var item = {};
        item.code = specList.pop();
        item.isCorrect = true;
        items.push(item);
    }

    for (var j = 0; j < proportion[1]; j++) {
        var item = {};
        item.code = trickList.pop();
        item.isCorrect = false;
        items.push(item);
    }

    shuffle(items);

    var quiz = {};
    quiz.register = register;
    quiz.assignment = assignment;
    quiz.items = items;

    response.json(quiz);
});

function shuffle(array) {
    var i = 0
        , j = 0
        , temp = null

    for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
}

module.exports = router;