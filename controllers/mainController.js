const { changePartial } = require('../lib/helpers.js');

const main = (req, res) => {
        res.render(
                'mainView', 
        { layout: 'main-page' }),
        changePartial('sleepMeter', 'sleepMeter'),
        changePartial('moodMeter', 'moodMeter'),
        changePartial('bloodpressureMeter', 'bloodpressureMeter');
};

const saveSleep = (req, res) => {       
        console.log(req.body);
        res.redirect('/main');
};

const saveMood = (req, res) => {       
        console.log(req.body);
        res.redirect('/main');
};

const saveBloodpressure = (req, res) => {       
        console.log(req.body);
        res.redirect('/main');
};

module.exports = { main, saveSleep, saveMood, saveBloodpressure };