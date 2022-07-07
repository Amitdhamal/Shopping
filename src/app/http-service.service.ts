import { Injectable } from '@angular/core';
// import { HttpModule } from '@angular/http';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  UrlCart = "http://localhost:3000/cart"
  UrlBag = "http://localhost:3000/bag"
  constructor(private http : HttpClient) { }

  getCartList(){
    return this.http.get(this.UrlCart).pipe(map((res:any)=>{ return res}))
  }

  getBagList(){
    return this.http.get(this.UrlBag).pipe(map((res:any)=>{ return res}))
  }

  postCartList(data:any){
    console.log(data)
    return this.http.post<any>(this.UrlCart,data) 
  }

  postbagList(data:any){
    return this.http.post<any>(this.UrlBag,data)
  }

  deleteCartitem(id:number){
    return this.http.delete(this.UrlCart+'/'+id)
  }

  deleteBagitem(id:number){
    return this.http.delete(this.UrlBag+'/'+id)
  }

  

  patchcount(id:number,item:any){
    return this.http.put(this.UrlCart+'/'+id,item)
  }

}
