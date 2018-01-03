import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material';


import { SuggestComponent } from '../../../suggest/suggest.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    currentUser: string = sessionStorage.getItem('currentUser');
    pushRightClass: string = 'push-right';

    constructor(private translate: TranslateService, public router: Router, public dialog: MatDialog) {
        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {}

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
	 document.cookie = "user" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    submitSuggestion(){
        let dialogRef = this.dialog.open(SuggestComponent);     
        dialogRef.beforeClose().subscribe(result => {
           
      console.log('Dialog closed: ${result}');
    
     
    });  
    }
    calcTime(offset) {
        var d = new Date();
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        var nd = new Date(utc + (3600000*offset));
        return `${nd.getHours()}:${nd.getMinutes()}`;
    
    }
}
