import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { MasterData } from './project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private url = "http://localhost:3000/";

  private _projects = new BehaviorSubject<MasterData[]>([]);
  cast  = this._projects.asObservable();
  public dataStore: { masterData: MasterData[] } = {masterData:[]} ;
  constructor(private http: HttpClient) {
    this.loadAll()
   }

  
  public getBacked(){
    return this.http.get(this.url + 'backend')
  }
  public getdata(){
  return this.http.get(this.url +'data')
  }

  update(content) {
    const body = content;
    const id = content.id
    console.log("update",body)
    this.http.put(this.url + 'data/'+id,body).subscribe(data => {
      console.log("Updated Content",data)
    })
    this.loadAll()

}

updateSetings(content){
  const body = content;
  const id = content
  console.log("update",body)
  this.http.put(this.url + 'backend/?embed=settings' ,body).subscribe(data => {
    console.log("Updated Content",data)
  })
  this.loadAll()
}

updateWholeData(content){
  const body = [...content];
  console.log("updatewhole",body)
  this.http.put(this.url + 'data' ,body).subscribe(data => {
    console.log("Updated Content",data)
  })

}


  loadAll() {

    return this.http.get<any>(this.url + 'data')
    .toPromise()
    .then(res => <MasterData[]>res.data)
    .then(data =>{return data;});
  }

  


}
