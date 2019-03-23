module.exports = function(app) {
    app.post('/login', login)
    app.post('/register', createUser)
}

function login(req, res) {
        if (user !== null) {
            req.session['currentUser'] = req.body;
            res.send(req.session['currentUser']);
        }
        else {
            user = {"user": 'Not found'};
            res.send(JSON.stringify(user));
        }
}
function createUser(req,res) {
            req.session['currentUser']  = req.body;
            res.send(req.session['currentUser'])
}


