module.exports = function(app) {
    app.post('/login', login)
    app.post('/register', createUser)
}
const request = require('request')
function login(req, res) {
            req.session['currentUser'] = req.body;
            let user = req.body
            request.get('http://40.71.97.231:9200/users/_search', {
                "query": {
                    "query_string" : {
                        "default_field" : "content",
                        "query" : req.body.username
                    }
                }
            }, (error, re, body) => {
                if (error) {
                    console.error(error)
                    return
                }
                body = JSON.parse(body)
                if (body["hits"]["total"] !== 0) {
                    res.send(user);
                }
                else {
                    user = {"user": 'Not found'};
                    res.send(400);
                }
            });
}

function createUser(req,res) {
            req.session['currentUser']  = req.body;
            request.post('http://40.71.97.231:9200/users/user', {
                json: req.body
            }, (error, res, body) => {
                if (error) {
                    console.error(error)
                    return
                }
                console.log(`statusCode: ${res.statusCode}`)
                console.log(body)
            });
            res.send(req.session['currentUser'])
}


