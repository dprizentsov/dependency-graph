import { Response, Request } from "express";
import { Router } from "express-serve-static-core";
var http = require('http');
import { httpRequest } from "./httpRequests";

const express = require('express');
const Promise = require('bluebird');

const newtonHost = 'ams-vm-av05';
const newtonPort = 8888;
const graphServicePath = '/ws/model/gremlin';

class GraphService {

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
      let gremlinRequest = req.body;
      let queryBody = JSON.stringify({"gremlin" : gremlinRequest});
      httpRequest('POST', newtonHost, newtonPort, graphServicePath, {}, null, queryBody, function(err, code1, jsonStr) {
        console.log('  GET result ' + code1 + ': ' + jsonStr);
        res.status(200).json(jsonStr);
      }, this.httpAgent);
    });
    this.router = router;
  }

  getRouter():Router{
    return this.router;
  }
}


exports.graphServiceRouter = function(context): Router {
  return new Promise(function(resolve, reject) {
    let dataservice = new GraphService(context);
    resolve(dataservice.getRouter());
  });
}