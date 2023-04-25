import { Directive, OnDestroy, Output, EventEmitter, HostListener, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { buffer, debounceTime, filter, map } from "rxjs/operators";

@Directive({
    selector: '[appDoubleClick]'
})
export class DoubleClickDirective implements OnInit, OnDestroy {
    private click$ = new Subject<MouseEvent>();

    @Output() doubleClick = new EventEmitter<MouseEvent>();

    @HostListener("click", ["$event"])
    onClick(event: MouseEvent) {
        this.click$.next(event);
    }

    ngOnInit() {
        this.click$
            .pipe(
                buffer(this.click$.pipe(debounceTime(250))),
                filter(list => list.length === 2),
                map(list => list[1])
            )
            .subscribe(response => this.doubleClick.emit(response));
    }

    ngOnDestroy() {
        this.click$.complete();
    }
}