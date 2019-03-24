
    const request = require('request')

    function addChild(req, res) {
        request.post('http://40.71.97.231:9200/children/profile', {
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

    module.exports = function (app) {
        app.post("/child", addChild)
        app.post("/parent", addParent)
        app.get("/users",getUsers)
    }