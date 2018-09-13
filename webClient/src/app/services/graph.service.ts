import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GraphService {
  private destination:string;
  
  constructor(private http: Http){}

  setDestination(path: string):void {
    this.destination = path;
  }

  executeGremlin(query: string): Observable<any> {
    return this.http.post(this.destination, query);
  }

}

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

