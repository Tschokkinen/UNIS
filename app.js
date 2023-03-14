const express = require('express');
const { engine } = require('express-handlebars');
const handlebars = require('handlebars');
const { changePartial } = require('./lib/helpers.js');

const app = express();

const options = {
    layoutsDir: 'views/layouts',
    defaultLayout: 'split',
    partialsDir: 'views/partials',
    helpers: require('./lib/helpers.js')
};

app.engine('handlebars', engine(options));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render(
        'splitView',
        changePartial('leftPartial', 'signInLeft'),
        changePartial('rightPartial', 'signInRight')
    )
});

app.get('/main', (req, res) => {
    res.render('mainView', { layout: 'main-page' });
});

app.use(express.static('public/'));

app.listen(3000, () => {
    console.log("Server running on port: 3000");
});