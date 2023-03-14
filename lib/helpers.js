const handlebars = require('handlebars');

function changePartial (partialSide, partialName) {
    handlebars.registerHelper(partialSide, function(context, options) {
        return partialName;
});
}

module.exports.changePartial = changePartial;