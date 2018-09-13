

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

import { Component, Inject } from '@angular/core';

import { Angular2InjectionTokens } from 'pluginlib/inject-resources';

import { GraphService } from './services/graph.service';
import { Link, Node } from './d3';

// import config from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [GraphService]
})

export class AppComponent {
  items = ['a', 'b', 'c', 'd']
  title = 'app';
  helloText: string;
  serverResponseMessage: string;

  selectedValue: any;
  nodes: Node[] = [];
  links: Link[] = [];
  linksSrc: any;
  nodesSrc: any;
  allNodes: Node[];

  discoveryPath: string;
  gremlinPath: string;

  constructor(
    @Inject(Angular2InjectionTokens.PLUGIN_DEFINITION) private pluginDefinition: ZLUX.ContainerPluginDefinition,
    private graphService: GraphService) {
    this.discoveryPath = RocketMVD.uriBroker.pluginRESTUri(this.pluginDefinition.getBasePlugin(), 'discovery', "");
    this.gremlinPath = RocketMVD.uriBroker.pluginRESTUri(this.pluginDefinition.getBasePlugin(), 'gremlin', "");

    /*this.graphService.discovery(this.discoveryPath, 'ALTST5', 'avoynov', 'rocket1', (err) => {
      console.log('Discoveery result: ' + err);
      if (!err) {
        this.executeGremlin('g.V()', (err, data) => {
          console.log('Request success: ' + data);
          //TODO
        });
      }
    });*/

    // this.linksSrc = config.dataSrc.split('\n').map(str => {
    //   const arr = str.split('=');
    //   const name = arr[0];
    //   let parents: any[] = [];
    //   if(arr[1].trim() !== ''){
    //     parents = arr[1].split(' ').filter(str => str !== '');
    //   }
    //   return {
    //     name,
    //     parents
    //   }
    // });

    // this.nodesSrc = this.links2Nodes(this.linksSrc);

    // console.log(this.nodesSrc);

    this.nodesSrc = [];
    this.linksSrc = [];

    //console.log(edges);
    //console.log(nodes);

    this.makeNodesAndLinks(this.nodesSrc, this.linksSrc, true);
  }

  onDiscovered(err: any): void {
    console.log('onDiscovered');
    this.executeGremlin("g.V()", (err: string, nodesResult: any) => {
      console.log('executeGremlin nodesResult ' + err + " " + nodesResult);
      this.executeGremlin("g.E()", (err: string, edgesResult: any) => {
        console.log('executeGremlin edgesResult ' + err + " " + edgesResult);
        // console.log(nodesResult._body);
        let nodesSrc = JSON.parse(JSON.parse(nodesResult._body)).result.data;
        let edgesSrc = JSON.parse(JSON.parse(edgesResult._body)).result.data;
        console.log(nodesSrc);
        console.log(edgesSrc);

        this.nodes = nodesSrc.map((vertex: any) => {
          const node = new Node(String(vertex.id), vertex.properties.name[0].value);
          //node.linkCount = nodesSrc[name];
          switch (vertex.label) {
            case 'Library':
            case 'Product':
            case 'SystemPool':
              node.linkCount = 20;
              break;
            case 'Group':
              node.linkCount = 40;
              break;
            case 'AS400':
              node.linkCount = 50;
              break;
            default:
              node.linkCount = 10;
          }


          return node;
        });

        this.links = edgesSrc.map((edge: any) => {
          return {
            source: String(edge.inV),
            target: String(edge.outV),
            value: 1
          };
        });
      });
    });
  }

  executeGremlin(query: string, complete: (err: any, result?: string) => void): void {
    this.graphService.post(this.gremlinPath, query).subscribe(res => {
      console.log(res);
      complete(null, res);
    }, (error: any) => {
      console.log('Error discovery: ' + error);
      complete(error);
    });
  }

  links2Nodes(links: any) {
    return links.reduce((acc: any, obj: any) => {

      function increment(name: string) {
        // if(acc[obj.name] === undefined) {
        //   acc[obj.name] = 0;
        // }
        acc[name]++;
      }
      //acc[obj.name] = true;
      acc[obj.name] = 0;
      //increment(obj.name);
      obj.parents.forEach((parent: any) => (increment(parent)));
      return acc;
    }, {});
  }

  makeNodesAndLinks(nodesSrc: any, linksSrc: any, initAllNodes: any): any {
    this.nodes = Object.keys(nodesSrc).map(name => {
      const node = new Node(name, name);
      node.linkCount = nodesSrc[name];
      return node;
    });

    if (initAllNodes) {
      this.allNodes = [...this.nodes];
      this.allNodes.sort(function (a, b) {
        return strcmp(a.id.toLowerCase(), b.id.toLowerCase());
      });
    }

    function strcmp(a: string, b: string) {
      return (a < b ? -1 : (a > b ? 1 : 0));
    }
    this.nodes.sort(function (a: Node, b: Node) {
      return strcmp(a.id.toLowerCase(), b.id.toLowerCase());
    });
    this.links = linksSrc.reduce((acc: any, obj: any) => {
      obj.parents.forEach((parent: any) => {
        acc.push({
          source: obj.name,
          target: parent,
          value: 1
        });
      });

      return acc;
    }, [])
  }

  onSelectChange() {
    console.log(this.selectedValue);

    // this.nodesSrc = 
    const index = this.linksSrc.reduce((acc: any, link: any) => {
      acc[link.name] = link;
      return acc;
    }, {});

    const selectedEls: any = {};

    function selectEls(id: any) {
      if (selectedEls[id] === undefined) {
        selectedEls[id] = index[id];
        index[id].parents.forEach(selectEls);
      }
    }

    selectEls(this.selectedValue);

    console.dir(selectedEls);

    function values(obj: any) {
      return Object.keys(obj).reduce((acc: any, key: any) => {
        acc.push(obj[key]);
        return acc;
      }, []);
    }
    //const vals = [for (key of Object.keys(obj)) obj[key]];


    const localNodes = this.links2Nodes(values(selectedEls));

    console.log(localNodes);

    this.makeNodesAndLinks(localNodes, values(selectedEls), false);


  }

  // sayHello() {
  //   this.helloService.sayHello(this.helloText)
  //   .subscribe(res => {
  //     const responseJson: any = res.json();
  //     if (responseJson != null && responseJson.serverResponse != null) {
  //       this.serverResponseMessage = 
  //       `Server replied with 

  //       "${responseJson.serverResponse}"`;
  //     } else {
  //       this.serverResponseMessage = "<Empty Reply from Server>";
  //     }
  //     console.log(responseJson);
  //   });
  // }
}


/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

