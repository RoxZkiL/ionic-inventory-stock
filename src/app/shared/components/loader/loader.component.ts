import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class LoaderComponent implements OnInit {

    isLoading$: Observable<boolean>;

    constructor(private loaderService: LoaderService) {
        this.isLoading$ = this.loaderService.isLoading;
    }

    ngOnInit() { }

}
