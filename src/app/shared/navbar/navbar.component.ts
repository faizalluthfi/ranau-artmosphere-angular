import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthService } from 'app/services/auth.service';
import { User } from 'app/classes/user';

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;
    user: User;
    title: String;

    @ViewChild("navbar-cmp") button;

    constructor(
        location:Location,
        private renderer : Renderer,
        private element : ElementRef,
        private authService: AuthService,
        private router: Router
    ) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit(){
        this.authService.session.subscribe(user => this.user = user);
        let user = this.authService.user;
        if (user) {
            this.authService.session.next(user);
        }
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.title = 'Dashboard';
                const root = this.router.routerState.snapshot.root;
                if (root.children.length > 0) {
                    if (root.children[0].data) {
                        this.title = root.children[0].data.title;
                        return;
                    }
                }
            }
        });
    }
    sidebarToggle(){
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];

        if(this.sidebarVisible == false){
            setTimeout(function(){
                toggleButton.classList.add('toggled');
            },500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
}
