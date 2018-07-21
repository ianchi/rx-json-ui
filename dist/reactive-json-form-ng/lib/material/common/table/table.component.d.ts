/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import { OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AbstractWidget, Expressions } from '../../../core/index';
export declare class TableWidgetComponent extends AbstractWidget implements OnInit {
    title: string;
    dataSource: Observable<any[]> | any[];
    tableDataSource: MatTableDataSource<{
        [prop: string]: any;
    }>;
    colKeys: string[];
    colHeaders: string[];
    colsVisible: string[];
    pageSizes: number[];
    filterBy: string[];
    disableSort: string[];
    colTransform: string[];
    colFormat: string[];
    actions: {
        icon: string;
        label: string;
        action: string;
    }[];
    actionsHeader: string;
    showCols: string[];
    paginator: MatPaginator;
    sort: MatSort;
    constructor(cdr: ChangeDetectorRef, expr: Expressions);
    dynOnBeforeBind(): void;
    ngOnInit(): void;
    applyFilter(filterValue: string): void;
    actionClick(rowData: any, actionIndex: number): void;
}
