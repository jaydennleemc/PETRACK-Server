
const request = require('request');

exports.validateFacebookToken = function (token) {
    return new Promise((resolve, reject) => {
        request('https://graph.facebook.com/me?fields=id,picture,name,email,gender,birthday&access_token=' + token, function (err, res, body) {
            if (err) {
                console.error('error:', err);
                reject(err);
            } else if (res.statusCode == 200) {
                console.log('statusCode:', res && res.statusCode);
                console.log('body:', body);
                resolve(body);
            }
        })
    })
}