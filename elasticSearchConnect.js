module.exports = function (app) {
    app.post("/child", addChild);
    app.post("/parent", addParent);
    app.get("/users", getUsers);
    app.get("/child", searchChild);
    app.get("/parent", searchParent)
};
    const request = require('request');
    let parent1 = "";
    let parent2 = "";
    function addChild(req, res) {
        child = req.body;
        parent1 = child.parent1;
        parent2 = child.parent2;
        request.post('http://40.71.97.231:9200/children/profile', {
            json: child
        }, (error, res, body) => {
            if (error) {
                console.error(error)
                return
            }
            console.log(`statusCode: ${res.statusCode}`)
            console.log(body)
        })
    }

    function addParent(req, res) {
        request.post('http://40.71.97.231:9200/parent/profile', {
            json: req
        }, (error, res, body) => {
            if (error) {
                console.error(error)
                return
            }
            console.log(`statusCode: ${res.statusCode}`)
            console.log(body)
        })
    }


    function getUsers() {
        request.get('http://40.71.97.231:9200/children/profile/_search?'
            , (error, res, body) => {
                if (error) {
                    console.error(error)
                    return
                }
                console.log(`statusCode: ${res.statusCode}`)
                console.log(body)
            })
    }

    function searchChild(req, res) {
        request.get('http://40.71.97.231:9200/_search?q=firstname:xyz||firstname=Akriti'
        , (error, re, body) => {
            if (error) {
                console.error(error)
                return
            }
            body = JSON.parse(body)
            res.send(body)
    });
    }

    function searchParent(req, res) {
        request.get('http://40.71.97.231:9200/parent/_search', {
            "query": {
                "query_string" : {
                    "default_field" : "content",
                    "query" : req.params['query']
                }
            }
        }, (error, re, body) => {
            if (error) {
                console.error(error)
                return
            }
            body = JSON.parse(body)
            res.send(body)
        });
    }

