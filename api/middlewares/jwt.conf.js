const jwt = require('jsonwebtoken');

module.exports.verifyJwtToken = (req, res, next) => {
    var token;
    if ('authorization' in req.headers)
        token = req.headers['authorization'].split(' ')[1];

    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    else {
        jwt.verify(token, process.env.SECRET_KEY,
            (err, decoded) => {
                if (err){
                    console.log(err)
                    return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
                }
                else {
                    res.locals.the_id = decoded._id;
                    next();
                }
            }
        )
    }
}