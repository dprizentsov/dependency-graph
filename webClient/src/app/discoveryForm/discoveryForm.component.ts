import { Component, OnInit , Inject, Input } from '@angular/core';
import { Angular2InjectionTokens } from 'pluginlib/inject-resources';

import { GraphService } from '../services/graph.service';

@Component({
  selector: 'discovery-form',
  templateUrl: './discoveryForm.component.html',
  styleUrls: ['./discoveryForm.component.css', './discoveryForm.component.custom.css']
})
export class DiscoveryFormComponent implements OnInit {
    @Input() complete: (err: any)=>void;
    discoveryPath: string;
    address: string = 'ALTST5';
    username: string = 'avoynov';
    password: string = 'rocket1';
    // address: string;
    // username: string;
    // password: string;

    isLoading: boolean = false;




    constructor(@Inject(Angular2InjectionTokens.PLUGIN_DEFINITION) private pluginDefinition: ZLUX.ContainerPluginDefinition,   
    private graphService: GraphService) {
        this.discoveryPath = RocketMVD.uriBroker.pluginRESTUri(this.pluginDefinition.getBasePlugin(), 'discovery',"");
    }

    ngOnInit(): void {
        //throw new Error("Method not implemented.");
    }

  //@Input('nodes') nodes: any;
  //@Input('links') links: any;
  
  discover(): void {
    console.log("Pshhh");
    this.isLoading = true;
    setTimeout(() => {
        this.graphService.discovery(this.discoveryPath, this.address, this.username, this.password, (err: any) => {
            console.log("Discovery completer with " + err);
            this.isLoading = false;
            this.complete(err);
        });
    }, 3000);
  }
}
