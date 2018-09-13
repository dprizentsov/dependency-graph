import { Response, Request } from "express";
import { Router } from "express-serve-static-core";
var http = require('http');
import { httpRequest } from "./httpRequests";

const express = require('express');
const Promise = require('bluebird');

const newtonHost = 'localhost';
const newtonPort = 8080;
const discoveryServicePath = '/ws/model/discovery';

class DiscoveryService {

    private context: any;
    private router: Router;
    private httpAgent: any = http.Agent({keepAlive: true});
    
    constructor(context: any){
      this.context = context;
      let router = express.Router();
      router.use(function noteRequest(req: Request,res: Response,next: any) {
        context.logger.info('Saw request, method='+req.method);
        next();
      });
      context.addBodyParseMiddleware(router);
      router.post('/',(req: Request,res: Response) => {
        let serverCredentials = JSON.parse(req.body);
        let queryBody = serverCredentials.address + '\n' +  serverCredentials.username + '\n' + serverCredentials.password;
        httpRequest('POST', newtonHost, newtonPort, discoveryServicePath, {}, null, queryBody, function(err, code1, jsonStr) {
          if (!err) {
            console.log('  POST result ' + code1 + ': ' + jsonStr);
            res.status(code1).json(jsonStr);
          } else {
            console.log("Request error: " + err);
          }
        }, this.httpAgent);
      });
      this.router = router;
    }
  
    getRouter():Router{
      return this.router;
    }
  }
  
  
  exports.discoveryServiceRouter = function(context): Router {
    return new Promise(function(resolve, reject) {
      let dataservice = new DiscoveryService(context);
      resolve(dataservice.getRouter());
    });
  }