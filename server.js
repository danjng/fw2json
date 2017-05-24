'use strict';

const express = require('express');
const path = require('path')
// Constants
const PORT = 8080;

var busboy = require('connect-busboy');

// App
const app = express();

app.use(busboy());
app.use(express.static(path.join(__dirname, 'public')));

app.route('/upload')
    .post(function(req,res,next) {
        

        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            
            console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
            file.on('data', function(data) {
                var filedata;
                //console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
                //console.log('File [' + fieldname + '] type: ' + data.type);
                //console.log('File [' + fieldname + '] contents: ' + data);
                filedata = data.toString('utf8');
                //console.log('filedata type: ' + filedata.constructor + ' with contents: ' + filedata);
                var fixy = require('fixy');
                // grab map from other JSON source?
                var fixyout = fixy.parse({
                    map:[{
                            name: "_State",
                            width: 2,
                            start: 1,
                            type: "string"
                        },{
                            name: "IMONTH",
                            width: 2,
                            start: 19,
                            type: "string"
                        },{
                            name: "IYEAR",
                            width: 4,
                            start: 23,
                            type: "string"                        
                        },{
                            name: "RSPSTATE",
                            width: 2,
                            start: 81,
                            type: "string"
                        },{
                            name: "LANDLINE",
                            width: 1,
                            start: 83,
                            type: "string"
                        },{
                            name: "HHADULT",
                            width: 2,
                            start: 84,
                            type: "string"
                        },{
                            name: "GENHLTH",
                            width: 1,
                            start: 90,
                            type: "string"
                        },{
                            name: "PHYSHLTH",
                            width: 2,
                            start: 91,
                            type: "string"
                        },{
                            name: "MENTHLTH",
                            width: 2,
                            start: 93,
                            type: "string"
                        },{
                            name: "POORHLTH",
                            width: 2,
                            start: 95,
                            type: "string"
                        },{
                            name: "HLTHPLN1",
                            width: 1,
                            start: 97,
                            type: "string"
                        },{
                            name: "PERSDOC2",
                            width: 1,
                            start: 98,
                            type: "string"
                        },{
                            name: "ZIPCODE",
                            width: 5,
                            start: 163,
                            type: "string"
                        },{
                            name: "CAREGIV1",
                            width: 1,
                            start: 313,
                            type: "string"
                        },{
                            name: "CRGVREL1",
                            width: 2,
                            start: 314,
                            type: "string"
                        },{
                            name: "CRGVLNG1",
                            width: 1,
                            start: 316,
                            type: "string"
                        },{
                            name: "CRGVHRS1",
                            width: 1,
                            start: 317,
                            type: "string"
                        },{
                            name: "CRGVPRB1",
                            width: 2,
                            start: 318,
                            type: "string"
                        },{
                            name: "CRGVPERS",
                            width: 1,
                            start: 320,
                            type: "string"
                        },{
                            name: "CRGVHOUS",
                            width: 1,
                            start: 321,
                            type: "string"
                        },{
                            name: "CRGVMST2",
                            width: 1,
                            start: 322,
                            type: "string"
                        },{
                            name: "CRGVEXPT",
                            width: 1,
                            start: 323,
                            type: "string"
                        }],
                    options:{
                        fullwidth: 1400,
                        skiplines: null
                    }
                }, filedata.toString());
                console.log("Fixy Output: " + JSON.stringify(fixyout,null,4));
                res.end(JSON.stringify(fixyout,null,4));
            });
            file.on('end', function() {
                console.log('File [' + fieldname + '] Finished');
            });
        });
    });

var server = app.listen(PORT, function() {
    console.log('Listening on port %d', server.address().port);
});