import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";

@Injectable()
export class NgProgressService {

    onToggle: Subject<boolean>;
    onIncrement: Subject<number>;
    onSet: Subject<number>;

    /** Colorify progressbar */
    colors: string[];
    colorsInterval: number = 500;

    constructor() {
        this.onToggle = new Subject<boolean>();
        this.onIncrement = new Subject<number>();
        this.onSet = new Subject<number>();
    }

    start() {
        this.onToggle.next(true);
    }

    set(n) {
        this.onSet.next(n);
    }

    inc(n?) {
        this.onIncrement.next(n);
    }

    done() {
        this.onToggle.next(false);
    }
}
