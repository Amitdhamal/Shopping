import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpServiceService } from '../http-service.service';
declare var window:any

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  CartList :any
  bagList : any
  formModal:any
  showmodal = false
  obj :any
  myForm  = new FormGroup({
    itemName : new FormControl(),
    imgUrl : new FormControl(),
    qty: new FormControl(),
    cost: new FormControl(),
  })
  constructor( private httpserve : HttpServiceService) { }

  ngOnInit(): void {

    this.getCartlist()
    this.getBagtlist()
    // this.getBaglist()
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('exampleModal')
    )
    // 
    
  }

  getCartlist(){
    this.httpserve.getCartList().subscribe((data)=>{
      console.log(data)
      this.CartList = data
    })
  }

  getBagtlist(){
    this.httpserve.getBagList().subscribe((data)=>{
      console.log(data)
      this.bagList = data
    })
  }

 

  deleteCartItem(id :any){
    this.httpserve.deleteCartitem(id).subscribe((data)=>{
      this.getCartlist()
    })
  }

  deleteBagItem(id :any){
    this.httpserve.deleteBagitem(id).subscribe((data)=>{
      this.getBagtlist()
    })
  }

  openModal(){
    this.formModal.show()
  }

  // closeModal(){
  //   this.formModal.hide()
  //   this.formModal.classList.remove("fade");
  // }

  additem(){
    
  }

  onSubmit(e:any){
    // e.preventDefault()
    console.log(this.myForm)
    this.postitem()
    this.getCartlist()
  }


  postitem(){
    this.httpserve.postCartList(this.myForm.value).subscribe((res)=>{this.getCartlist()})
  }

  postBagitems(item :any){
    this.httpserve.postbagList(item).subscribe((res)=>{
      this.getBagtlist()
    })
  }


  decremnt(item:any){
    item.qty--
    this.httpserve.patchcount(item.id,item).subscribe(()=>{
      console.log('Qty updated')
    })
  }

  incremnt(item:any){
    item.qty++
    this.httpserve.patchcount(item.id,item).subscribe(()=>{
      console.log('Qty updated')
    })
  }



  addToBag(item :any){
    this.postBagitems(item)
  }

  a(){
    console.log(this.bagList)
  }

}
