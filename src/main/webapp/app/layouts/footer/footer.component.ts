import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'jhi-footer',
    templateUrl: './footer.component.html',
    styleUrls: [
        'footer.css'
    ]
})
export class FooterComponent {
    constructor(
        private router: Router
    ) {}

    isHomePage() {
        return (this.router.url === '/' || this.router.url === '');
    }
}
