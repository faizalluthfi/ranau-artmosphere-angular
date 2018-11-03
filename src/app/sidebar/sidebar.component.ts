import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { User } from 'app/classes/user';

declare var $:any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'transactions', title: 'Transaksi',  icon: 'ti-layout', class: '' },
    { path: 'daily-expenses', title: 'Pengeluaran Harian',  icon: 'ti-list', class: '' },
    { path: 'report', title: 'Laporan',  icon: 'ti-view-list', class: '' },
    { path: 'backup-and-restore', title: 'Cadangan Data',  icon: 'ti-server', class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    user: User;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.authService.session.subscribe(user => this.user = user);
        this.authService.session.subscribe(user => {
            if (user) this.menuItems = ROUTES.filter(menuItem => menuItem);
            else this.menuItems = [];
        });
    }
    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }
    get version(): string {
        return window['packageJson'].version;
    }

}
