import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private activeRequests = 0;

    constructor() { }

    show() {
        this.activeRequests++;
        if (this.activeRequests === 1) {
            this.isLoading.next(true);
        }
    }

    hide() {
        if (this.activeRequests > 0) {
            this.activeRequests--;
        }
        if (this.activeRequests === 0) {
            this.isLoading.next(false);
        }
    }
}
