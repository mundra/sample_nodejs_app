var http = require('http');
var url = require('url');

var logger = {
	
	info: function(message){
		this.log(message, 'INFO');	
	},

	warn: function(message){
                this.log(message, 'WARN');            
        },
	
	error: function(message){
                this.log(message, 'ERROR');            
        },

	debug: function(message){
                this.log(message, 'DEBUG');            
        },

	log: function(message, severity = "INFO") {
		const timestamp = new Date().toISOString();
		console.log(`${timestamp} ${severity} ${message}`);
	}
}

//HTTP request for the response code 410
const unresolvedHttpUrl = new URL("http://httpstat.us/410");
const unresolvedHttpRequestOptions = {
  hostname: unresolvedHttpUrl.hostname,
  port: unresolvedHttpUrl.port,
  path: unresolvedHttpUrl.pathname,
  method: 'GET',
};

//HTTP request for the response code 200
const resolvedHttpUrl = new URL("https://httpbin.org/get");
const resolvedHttpRequestOptions = {
  hostname: resolvedHttpUrl.hostname,
  port: resolvedHttpUrl.port,
  path: resolvedHttpUrl.pathname,
  method: 'GET',
};

//Simple HTTP Server is listening on port 8080
const port = 8080;
http.createServer(onRequest).listen(port);
logger.log('NodeJS sample app has started...');
logger.log("Receiving requests at: http://localhost:8080/hello");

function onRequest(request, response) {
  var pathName = url.parse(request.url).pathname
  logger.info('App received request on URL: ' + pathName);

  //Handling requests only on /hello endpoint. 
  if (pathName === '/hello') {
    callHTTP(unresolvedHttpRequestOptions);
    callHTTP(resolvedHttpRequestOptions);
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write("Done with both HTTP calls.");
    response.end();
  }
  else {
    response.writeHead(404, { 'Content-Type': 'text/html' });
    response.end();
  }
}

function callHTTP(httpRequestOptions) {

  var req = http.request(httpRequestOptions, function (res) {
    if (res.statusCode === 200) {
      logger.info('For ' + httpRequestOptions.hostname + ' the HTTP Response: ' + res.statusCode + ' and statusMessage: ' + res.statusMessage);
    } else {
      logger.error('For ' + httpRequestOptions.hostname + ' the HTTP Response: ' + res.statusCode + ' : ' + res.statusMessage);
    }
  });

  req.end();
  req.on('error', function (e) {
    logger.error("Error in HTTP Call: " + e);
  });
}

process.on('SIGINT', function () {
  logger.info("\nGracefully shutting down from SIGINT (Ctrl-C)");
  process.exit(0);
});
