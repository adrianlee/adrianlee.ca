var express = require('express'),
    http = require('http'),
    path = require('path'),

    // Third Party
    hbs = require('hbs');

var app = express();

// var github = require('octonode');
// var githubClient = github.client();

////////////////////////////////////////////////
// Express Configuration
////////////////////////////////////////////////
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.engine('html', require('hbs').__express);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

////////////////////////////////////////////////
// Handlebars
////////////////////////////////////////////////
var blocks = {};

hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context(this));
});

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});

////////////////////////////////////////////////
// Router
////////////////////////////////////////////////
app.get('/', function(req, res) {

  // don't want to block.
  // githubClient.get('/users/adrianlee', function (err, status, body) {
  //   if (err) {
  //     console.log(err);
  //     res.render('index', { title: 'adrianlee.ca', github: { avatar_url: "/img/spongebob.jpeg" } });
  //   }
  //   console.log(body);
  //   res.render('index', { title: 'adrianlee.ca', github: body });
  // });

  res.render('index', { title: 'adrianlee.ca', github: { gravatar_id: "6438455cfde96c145cc9a53fd8657ef7" } });
});

////////////////////////////////////////////////
// HTTP Server
////////////////////////////////////////////////
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
