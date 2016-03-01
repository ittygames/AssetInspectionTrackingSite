http = require('http');
rsvp = require('rsvp');

var datastore = "";  // dataholder

exports.add = function(req, res, next){

}

exports.edit = function(req, res, next){

}

exports.update = function(req, res, next){

}

exports.delete = function(req, res, next){

}

exports.list = function(req, res, next){

    rsvp.all([getAllAssetTypes()]).then(res.render('listAssetType', { data: datastore  }));
}


// data callers
function getAllAssetTypes(){

    return new rsvp.Promise(function(resolve, reject) {

       var options = {
           host: "192.168.20.101",
           port: 8080,
           path: '/api/assetType',
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