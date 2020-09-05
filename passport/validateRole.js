const rolModel = require('../api/authentication/model/rolModel')
var isValidLogin = async function(req, res, next) {
    try {
        var user = req.user._doc;
        var path = req.originalUrl;
        var method = req.method;
        var rol = await rolModel.findOne({ _id: user.rol }).lean();
        var isValid = false;
        rol.routes.forEach(function(item, index) {
            if (item.method.includes(method) && path.includes(item.route)) {
                isValid = true;
            }
        });
        if (isValid) {
            next();
        } else {
            res.status(403).json("You are not allowed to access.");
        }
    } catch (err) {
        res.status(403).json("You are not allowed to access by an error");
    }

}

module.exports.isValidLogin = isValidLogin;