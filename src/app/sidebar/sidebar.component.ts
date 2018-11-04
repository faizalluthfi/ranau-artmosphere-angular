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
    hidden?: boolean;
}

export const ROUTES: RouteInfo[] = [
    { path: 'transactions', title: 'Transaksi',  icon: 'ti-layout', class: '' },
    { path: 'daily-expenses', title: 'Pengeluaran Harian',  icon: 'ti-list', class: '', roles: [1] },
    { path: 'report', title: 'Laporan',  icon: 'ti-view-list', class: '' },
    { path: 'backup-and-restore', title: 'Cadangan Data',  icon: 'ti-server', class: '', roles: [1] },

    { path: 'categories', title: 'Kategori Layanan', hidden: true },
    { path: 'materials', title: 'Kategori Pengeluaran', hidden: true },
    { path: 'report-categories', title: 'Kategori Laporan', hidden: true },
    { path: 'users', title: 'User', hidden: true },
    { path: 'settings', title: 'Pengaturan', hidden: true },
    { path: 'profile', title: 'Ubah Profil', hidden: true },
    { path: 'login', title: 'Login', hidden: true },
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
                        if (route.roles.includes(user.role_id) && !route.hidden) {
                            this.menuItems.push(route);
                        }
                    } else if (!route.hidden) {
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
