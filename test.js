var express = require("express");
var fs = require("fs");
var app = express();
var http = require('http');


app.get('/',function(req, res){
    fs.readFile('./list.html', function(error, data){
        res.writeHead(200, {'Content-Type':'text/html'});
        res.end(data);
        console.log(error);
    });  
});



app.get('/download/:id', function(req, res){
    var filenm = req.params.id;
    var dirnm = '/home/catpunch5/Test';
    filepath = dirnm + '/files/' + filenm;
    res.download(filepath);
});




app.get('/test', function(req, res){
    fs.readdir('/home/catpunch5/Test/files', function(error, filelist){
        var list = '<ul>';
        var i = 0;
        while(i < filelist.length){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i = i + 1;
        }
        list = list+'</ul>';
        res.json({data : list});
        console.log(list);
    });
});

app.listen(9090,function(){
    console.log("yes");
});
