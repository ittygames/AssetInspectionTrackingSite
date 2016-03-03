http = require('http');
rsvp = require('rsvp');

var datastore = "",  // dataholder
 api_host = "192.168.20.101",
 api_port = 8080,
 api_defaultPath = "/api/assetType/";



exports.add = function(req, res, next){

}

exports.view = function(req, res, next){


    rsvp.all([getAssetTypeByID(req.params.id)]).then(res.render('viewAssetType',
        {
            data: datastore,
            _editModeVisible : false
        }));
}

exports.update = function(req, res, next){

}

exports.delete = function(req, res, next){

}

exports.list = function(req, res, next){
    rsvp.all([getAllAssetTypes()]).then(res.render('listAssetType',
        {
            data: datastore,
            _editModeVisible : false
        }));
}


// data callers
function getAllAssetTypes(){

    return new rsvp.Promise(function(resolve, reject) {

       var options = {
           host: api_host,
           port: api_port,
           path: api_defaultPath,
           method: 'get'
       };

       http.request(options, function (res) {
           console.log('STATUS: ' + res.statusCode);
           if (res.statusCode == 200) {
               console.log('HEADERS: ' + JSON.stringify(res.headers));
               res.setEncoding('utf8');
               res.on('data', function (chunk) {
                   console.log('BODY: ' + chunk);
                   datastore = JSON.parse(chunk);
               });
               resolve();
           } else {
               var rejectStatement = function(){return res.statusCode + " res.body";};
               reject(rejectStatement);
           }

       }).end();

});
}

function getAssetTypeByID(_id){

    return new rsvp.Promise(function(resolve, reject) {

        var options = {
            host: api_host,
            port: api_port,
            path: api_defaultPath + _id,
            method: 'get'
        };

        http.request(options, function (res) {
            console.log('STATUS: ' + res.statusCode);
            if (res.statusCode == 200) {
                console.log('HEADERS: ' + JSON.stringify(res.headers));
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    console.log('BODY: ' + chunk);
                    datastore = JSON.parse(chunk);
                });
                resolve();
            } else {
                var rejectStatement = function(){return res.statusCode + " res.body";};
                reject(rejectStatement);
            }

        }).end();

    });
}