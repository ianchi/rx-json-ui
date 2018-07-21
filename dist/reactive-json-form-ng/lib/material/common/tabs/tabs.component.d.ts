import { OnInit, ChangeDetectorRef } from '@angular/core';
import { AbstractWidget, Expressions } from '../../../core';
export declare class TabsWidgetComponent extends AbstractWidget implements OnInit {
    tabLabels: string[];
    constructor(cdr: ChangeDetectorRef, expr: Expressions);
    ngOnInit(): void;
}
