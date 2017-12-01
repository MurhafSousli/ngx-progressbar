import { OnChanges, SimpleChanges } from '@angular/core';
import { NgProgress } from '../../services/ng-progress.service';
export declare class NgProgressComponent implements OnChanges {
    progress: NgProgress;
    /** Progress options  */
    ease: string;
    meteor: boolean;
    spinner: boolean;
    spinnerPosition: string;
    direction: string;
    color: string;
    thick: boolean;
    maximum: number;
    minimum: number;
    speed: number;
    trickleSpeed: number;
    /** Start/Stop Progressbar */
    toggleProgressbar: boolean;
    constructor(progress: NgProgress);
    ngOnChanges(changes: SimpleChanges): void;
}
