import { OnInit } from '@angular/core';
import { NgProgressState } from '../../models/ng-progress.state';
import { NgProgress } from '../../services/ng-progress.service';
export declare class NgProgressBarComponent implements OnInit {
    progress: NgProgress;
    ease: string;
    speed: number;
    meteor: boolean;
    spinner: boolean;
    spinnerPosition: string;
    direction: string;
    thick: string;
    color: string;
    state$: any;
    constructor(progress: NgProgress);
    ngOnInit(): void;
    containerClasses(state: NgProgressState): {
        active: boolean;
        thick: string;
    };
    progressBarStyles(state: NgProgressState): {
        transition: string;
        background: string;
        mozTransform: string;
        oTransform: string;
        msTransform: string;
        webkitTransform: string;
        transform: string;
    };
    /**
     * Styles for progressbar tail
     */
    meteorStyles(): {
        boxShadow: string;
        left: any;
        transform: any;
    };
    /**
     * Convert number to percent
     * @param {number} n - State value
     */
    toPercentage(n: number): number;
    /**
     * Progress direction
     */
    spinnerClasses(): string;
    /**
     * Set spinner color
     */
    spinnerStyles(): {
        borderTopColor: string;
        borderLeftColor: string;
    };
}
