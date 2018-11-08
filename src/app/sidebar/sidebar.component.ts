import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { User } from 'app/classes/user';

declare var $:any;

export interface RouteInfo {
    path: string;
    title: string;
    icon?: string;
    class?: string;
    roles?: number[];
}

export const ROUTES: RouteInfo[] = [
    { path: 'transactions', title: 'Transaksi',  icon: 'ti-layout', class: '' },
    { path: 'daily-expenses', title: 'Pengeluaran',  icon: 'ti-list', class: '', roles: [1] },
    { path: 'report', title: 'Laporan',  icon: 'ti-view-list', class: '' },
    { path: 'backup-and-restore', title: 'Cadangan Data',  icon: 'ti-server', class: '', roles: [1] },
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
        this.authService.session.subscribe(user => {
            this.user = user;
            this.menuItems = [];
            if (user) {
                ROUTES.forEach(route => {
                    if (route.roles) {
                        if (route.roles.includes(user.role_id)) {
                            this.menuItems.push(route);
                        }
                    } else {
                        this.menuItems.push(route);
                    }
                });
            }
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
