import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { UpdateIndicatorComponent } from '../update-indicator/update-indicator.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ NavbarComponent, UpdateIndicatorComponent ],
    exports: [ NavbarComponent ]
})

export class NavbarModule {}
