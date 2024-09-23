import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-asset-menu',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './asset-menu.component.html',
  styleUrl: './asset-menu.component.css'
})
export class AssetMenuComponent {
  // Constructor and some required variables
  constructor(private http: HttpClient){}
  selectedComponent: string = 'AssignMenu';
  assetUrl: string = 'http://localhost:3000/';
  public data: any[] = [];

  showComponent(component:string){
    this.selectedComponent = component;
  }

  ngOnInit():void{
    this.GetAllAssets();
  }

  public GetAllAssets(){
    this.http.get(this.assetUrl).subscribe((resp:any)=>{
     this.data = resp;
     console.log(this.data)
    })

  }
}
