import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgProgressBarComponent} from "./ng-progress-bar/ng-progress-bar.component";
import {NgProgressComponent} from "./ng-progress/ng-progress.component";
import {NgProgressService} from './ng-progress.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        NgProgressComponent,
        NgProgressBarComponent
    ],
    providers: [
        NgProgressService
    ],
    exports: [
        NgProgressComponent
    ]
})
export class NgProgressModule {
}
