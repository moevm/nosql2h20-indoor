module.exports = function (req, res, next) {
    res.render('admin', {title: 'Admin panel', host: `http://${SERVER_HOST}:${SERVER_PORT}`});
};