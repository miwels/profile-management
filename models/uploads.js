exports.send = function(req, res) {
    upload(req, res, function(err) {
        if(err) return res.end(err.toString()); 
    });
    
    res.end('File is uploaded');
};