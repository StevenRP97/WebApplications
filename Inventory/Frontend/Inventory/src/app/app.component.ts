// Functional required imports
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common';

// App components imports
import { UserMenuComponent } from './user-menu/user-menu.component';
import { AssetMenuComponent } from './asset-menu/asset-menu.component';
import { AssignMenuComponent } from './assign-menu/assign-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UserMenuComponent, AssetMenuComponent, AssignMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private modalService: NgbModal) {
  }
  public open(modal: any): void {
    this.modalService.open(modal);
  }

  selectedComponent: string = 'AssetMenu';
  showComponent(component:string){
    this.selectedComponent = component;
  }
}
