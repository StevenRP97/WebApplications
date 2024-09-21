import { Component } from '@angular/core';

@Component({
  selector: 'app-asset-menu',
  standalone: true,
  imports: [],
  templateUrl: './asset-menu.component.html',
  styleUrl: './asset-menu.component.css'
})
export class AssetMenuComponent {
  selectedComponent: string = 'AssignMenu';
  showComponent(component:string){
    this.selectedComponent = component;
  }
}
