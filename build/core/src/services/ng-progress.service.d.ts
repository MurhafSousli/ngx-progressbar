import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { NgProgressState } from '../models/ng-progress.state';
export declare class NgProgress {
    /** Initial state */
    initState: NgProgressState;
    /** Progress state */
    state$: BehaviorSubject<NgProgressState>;
    /** Trickling stream */
    trickling$: Subject<{}>;
    progress: number;
    maximum: number;
    minimum: number;
    speed: number;
    trickleSpeed: number;
    /** Is progress started */
    readonly isStarted: boolean;
    /** Progress start event */
    readonly started: Observable<boolean>;
    /** Progress ended event */
    readonly ended: Observable<boolean>;
    constructor();
    /** Start */
    start(): void;
    /** Done */
    done(): void;
    /**
     * Increment the progress
     * @param {number} amount
     */
    inc(amount?: number): void;
    /**
     * Set the progress
     * @param {number} n - Progress value
     */
    set(n: number): void;
    /**
     * Update progress state
     * @param {number} progress - Progress value
     * @param {boolean} isActive - Progress active
     */
    private updateState(progress, isActive);
}
