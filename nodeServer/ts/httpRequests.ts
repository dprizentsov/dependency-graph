var httpModule = require('http');
var httpsModule = require('https');

export var httpRequest = function(method, hostname, port, path, headers, cookie, data, handler, httpAgent, timeout = 5000, http = httpModule) {
    var streamReadyHandler = null;
    var str = '';
    var dataHandler = function (chunk) {
        str += chunk;
    }
    var endHandler = function () {
        var cookie;
        if (this.statusCode === 200 && this.headers['set-cookie']) {
            cookie = this.headers['set-cookie'][0]
        }
        if (handler) {
            //setImmediate
            handler(null, this.statusCode, str, cookie);
        }
    };
    var errorHandler = function (err) {
        handler(err);
    };
    httpRequest2(method, hostname, port, path, headers, cookie, data, streamReadyHandler, dataHandler, endHandler, errorHandler, httpAgent, timeout, http);
}

export var httpRequest2 = function(method, hostname, port, path, headers, cookie, data, streamReadyHandler, dataHandler, endHandler, errorHandler, httpAgent, timeout = 5000, http = httpModule) {
    var opts = {
        hostname: hostname,
        port: port,
        path: path,
        method: method,
        agent: httpAgent,
        headers: headers
      };
    if (cookie) {
        opts.headers['Cookie'] = cookie;
    }
    if (data) {
        var len = Buffer.byteLength(data);
        opts.headers['Content-Length'] = len;
        opts.headers['content-type'] = 'application/json';
    }
    
    try {
        var timeoutTimer: any;
        var request = http.request(opts, function (response) {
            if (streamReadyHandler) {
                streamReadyHandler(null, response);
            }
            response.on('data', ()=>{
                if (timeoutTimer) {
                    clearTimeout(timeoutTimer);
                    request.removeListener('timeout', timeoutHandler);
                }
                timeoutTimer = request.setTimeout(timeout, timeoutHandler);
            });
            if (dataHandler) {
                response.on('data', dataHandler);
            }
            if (endHandler) {
                response.on('end', endHandler.bind(response));
            }
        }).on('error', errorHandler);
        var timeoutHandler = function() {
            request.end();
            errorHandler("@timeout");
        }
        timeoutTimer = request.setTimeout(timeout, timeoutHandler);
        if (streamReadyHandler) {
            streamReadyHandler(request, null);
        } else if (data) {
            request.write(data, function() {
                request.end();
            });
        } else {
            request.end();
        }
    } catch (err) {
        errorHandler(err);
    }
} 