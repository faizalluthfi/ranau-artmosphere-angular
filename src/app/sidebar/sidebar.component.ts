import { Component, OnInit } from '@angular/core';

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
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
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
