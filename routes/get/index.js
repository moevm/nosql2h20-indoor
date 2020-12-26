module.exports = function (req, res, next) {
    res.render('index', {title: 'Indoor navigation', host: `http://${SERVER_HOST}:${SERVER_PORT}`});
};
