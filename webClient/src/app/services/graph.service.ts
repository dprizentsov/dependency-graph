import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GraphService {
  
  constructor(private http: Http){}

  post(path: string, query: string): Observable<any> {
    return this.http.post(path, query);
  }

  discovery(discoveryPath: string, address: string, username: string, password: string, complete: (err: any) => void): void {
    this.post(discoveryPath, JSON.stringify({
      address: address,
      username: username,
      password: password
    })).subscribe(res => {
      console.log(res);
      complete(null);
    }, (error: any) => {
      console.log('Error discovery: ' + error);
      complete(error);
    });
  }
}

/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright Contributors to the Zowe Project.
*/

