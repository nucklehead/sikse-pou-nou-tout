var proxy = require('express-http-proxy');
var express = require('express'),
app = express();
app.use('/server', proxy('https://floating-beach-22005.herokuapp.com/api/'));
app.use(express.static('www'));
app.set('port', process.env.PORT || 9000);
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});