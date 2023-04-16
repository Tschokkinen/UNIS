const clearChartCookie = (req, res, next) => {
    res.clearCookie('chartCookie');
    next();
};

module.exports = { clearChartCookie };