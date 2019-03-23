
    const request = require('request')

    function addChild() {
        request.post('http://40.71.97.231:9200/children/profile', {
            json:
                {
                    "name": "Neha",
                    "lastname": "Shukla",
                    "job_description": "Systems administrator and specialit"
                }
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

    module.exports =  {
        addChild: addChild,
        getUsers: getUsers
    }