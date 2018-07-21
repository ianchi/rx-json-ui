/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */
import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { isObservable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AbstractWidget, Context, Expressions, parseDefObject } from '../../../core/index';
import { combineMixed } from 'espression';
export class TableWidgetComponent extends AbstractWidget {
    /**
     * @param {?} cdr
     * @param {?} expr
     */
    constructor(cdr, expr) {
        super(cdr, expr);
        this.disableSort = [];
        this.actions = [];
        this.tableDataSource = new MatTableDataSource();
    }
    /**
     * @return {?}
     */
    dynOnBeforeBind() {
        const /** @type {?} */ opt = this.widgetDef.options;
        // if the only source is a static array, lets check if it has 'property=' columns to evaluate
        // and add the auto binding
        if (opt && !opt['dataSource='] &&
            Array.isArray(opt["dataSource"])) {
            const /** @type {?} */ dataSource = /** @type {?} */ (combineMixed(opt["dataSource"].map(row => combineMixed(parseDefObject(row, this.context, false, this._expr)), false), false));
            if (isObservable(dataSource))
                this.bindings["dataSource"] = dataSource;
            else
                this.dataSource = dataSource;
        }
        this.map('disableSort', sort => {
            if (sort === true)
                return null;
            if (!Array.isArray(sort))
                return [];
            return sort;
        });
        this.map('dataSource', (table) => this.tableDataSource.data = table.map(row => {
            row = parseDefObject(row, Context.create(this.context, { $data: row }), false, this._expr);
            if (Array.isArray(this.colTransform)) {
                for (let /** @type {?} */ i = 0; i < this.colTransform.length; i++) {
                    if (this.colTransform[i]) {
                        const /** @type {?} */ context = Context.create(this.context);
                        context.$data = row[this.colKeys[i]];
                        row[this.colKeys[i]] = this._expr.eval(this.colTransform[i], context, false);
                    }
                }
            }
            return row;
        }));
        this.map('pageSizes', (value) => {
            if (!Array.isArray(value) || !value.length) {
                this.tableDataSource.paginator = null;
                return null;
            }
            this.tableDataSource.paginator = this.paginator;
            return value;
        });
        this.map('colKeys', keys => {
            if (this.actions && this.actions.length)
                this.showCols = keys.concat('__actions__');
            else
                this.showCols = keys;
            return keys;
        });
        this.map('actions', actions => {
            if (!Array.isArray(actions))
                actions = [];
            this.showCols = actions.length ? this.colKeys.concat('__actions__') : this.colKeys;
            return actions;
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.tableDataSource.sort = this.sort;
    }
    /**
     * @param {?} filterValue
     * @return {?}
     */
    applyFilter(filterValue) {
        this.tableDataSource.filter = filterValue;
        if (this.tableDataSource.paginator) {
            this.tableDataSource.paginator.firstPage();
        }
    }
    /**
     * @param {?} rowData
     * @param {?} actionIndex
     * @return {?}
     */
    actionClick(rowData, actionIndex) {
        const /** @type {?} */ context = Context.create(this.context, { $data: rowData });
        this.addSubscription = this._expr.eval(this.actions[actionIndex].action, context, true).subscribe(() => {
            // TODO logic to reload table
        });
    }
}
TableWidgetComponent.decorators = [
    { type: Component, args: [{
                selector: 'wdg-table',
                template: `<div>
  <section class="table-title">
    <h6>{{title}}</h6>

    <div class="spacer"></div>

    <mat-form-field *ngIf="filterBy">
      <input matInput (keyup)="applyFilter($event.target.value)" placeholder="Filter">
    </mat-form-field>
  </section>

  <section class="mat-elevation-z1">
    <table mat-table [dataSource]="tableDataSource" matSort [matSortDisabled]="!disableSort">

      <!-- Dynamic Column definitions-->
      <ng-container [matColumnDef]="colKey" *ngFor="let colKey of colKeys; index as colIndex">
        <th mat-header-cell *matHeaderCellDef mat-sort-header [disabled]="disableSort?.indexOf(colKey) >= 0"> {{colHeaders[colIndex] || colKey}} </th>
        <ng-container *ngIf="colFormat && colFormat[colIndex]; else noFormatCellDef">
          <td mat-cell *matCellDef="let rowData">{{rowData[colKey] | format:colFormat[colIndex]}}</td>
        </ng-container>
        <ng-template #noFormatCellDef>
          <td mat-cell *matCellDef="let rowData">{{rowData[colKey]}}</td>
        </ng-template>
      </ng-container>

      <ng-container *ngIf="actions?.length" [matColumnDef]="'__actions__'">
        <th mat-header-cell *matHeaderCellDef > {{actionsHeader || 'Actions'}} </th>
        <td mat-cell *matCellDef="let rowData">
          <button mat-icon-button [matMenuTriggerFor]="menu">
            <mat-icon svgIcon="dots-vertical"></mat-icon>
          </button>
          <mat-menu #menu="matMenu">

            <button mat-menu-item *ngFor="let action of actions; index as actionIndex" (click)="actionClick(rowData, actionIndex)">
              <mat-icon [svgIcon]="actions[actionIndex].icon"></mat-icon>
              <span>{{actions[actionIndex].label}}</span>
            </button>
          </mat-menu>
        </td>
      </ng-container>


      <!-- Row definitions-->
      <ng-container *ngIf="colHeaders">
        <tr mat-header-row *matHeaderRowDef="showCols" class="header-row"></tr>
      </ng-container>
      <tr mat-row *matRowDef="let element; columns: showCols;" class="data-row"></tr>
    </table>

    <mat-paginator [class.hiddenPaginator]="!pageSizes" [pageSizeOptions]="pageSizes" [hidePageSize]="pageSizes?.length<=1"></mat-paginator>
  </section>
</div>
`,
                styles: [`dyn-table table{width:100%}dyn-table tr.data-row:hover{background:#f5f5f5}dyn-table tr.data-row:active{background:#efefef}dyn-table .data-row td{border-bottom-width:0}dyn-table mat-paginator.hiddenPaginator{display:none}dyn-table .table-title{display:flex;flex-flow:row}dyn-table .table-title>*{flex:0 0 auto}dyn-table .table-title .spacer{flex:1 1 auto}`],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
TableWidgetComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Expressions }
];
TableWidgetComponent.propDecorators = {
    paginator: [{ type: ViewChild, args: [MatPaginator,] }],
    sort: [{ type: ViewChild, args: [MatSort,] }]
};
function TableWidgetComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    TableWidgetComponent.prototype.title;
    /** @type {?} */
    TableWidgetComponent.prototype.dataSource;
    /** @type {?} */
    TableWidgetComponent.prototype.tableDataSource;
    /** @type {?} */
    TableWidgetComponent.prototype.colKeys;
    /** @type {?} */
    TableWidgetComponent.prototype.colHeaders;
    /** @type {?} */
    TableWidgetComponent.prototype.colsVisible;
    /** @type {?} */
    TableWidgetComponent.prototype.pageSizes;
    /** @type {?} */
    TableWidgetComponent.prototype.filterBy;
    /** @type {?} */
    TableWidgetComponent.prototype.disableSort;
    /** @type {?} */
    TableWidgetComponent.prototype.colTransform;
    /** @type {?} */
    TableWidgetComponent.prototype.colFormat;
    /** @type {?} */
    TableWidgetComponent.prototype.actions;
    /** @type {?} */
    TableWidgetComponent.prototype.actionsHeader;
    /** @type {?} */
    TableWidgetComponent.prototype.showCols;
    /** @type {?} */
    TableWidgetComponent.prototype.paginator;
    /** @type {?} */
    TableWidgetComponent.prototype.sort;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nLyIsInNvdXJjZXMiOlsibGliL21hdGVyaWFsL2NvbW1vbi90YWJsZS90YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNILE9BQU8sRUFBYyxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDM0YsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFlBQVksQ0FBQztBQTZEMUMsTUFBTSwyQkFBNEIsU0FBUSxjQUFjOzs7OztJQXVCdEQsWUFBWSxHQUFzQixFQUFFLElBQWlCO1FBQ25ELEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7MkJBYkssRUFBRTt1QkFLbUMsRUFBRTtRQVM3RCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQztLQUNqRDs7OztJQUVELGVBQWU7UUFFYix1QkFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7OztRQUtuQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO1lBQzVCLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxlQUFZLENBQUMsQ0FBQyxDQUFD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V0FBbUI7UUFFM0MsdUJBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRWpFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FDL0YsR0FBRyxFQUFFOztTQUVKLENBQ0YsQ0FBQztLQUNIOzs7WUFoTEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2dCQUNyQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FvRFg7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsb1dBQW9XLENBQUM7Z0JBQzlXLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDs7OztZQWxFdUUsaUJBQWlCO1lBS3ZELFdBQVc7Ozt3QkFrRjFDLFNBQVMsU0FBQyxZQUFZO21CQUN0QixTQUFTLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE4IEFkcmlhbiBQYW5lbGxhIDxpYW5jaGk3NEBvdXRsb29rLmNvbT5cbiAqXG4gKiBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqIGh0dHBzOi8vb3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvTUlUXG4gKi9cblxuXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0VuY2Fwc3VsYXRpb24sIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIGlzT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTWF0VGFibGVEYXRhU291cmNlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFibGUnO1xuaW1wb3J0IHsgTWF0UGFnaW5hdG9yIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvcGFnaW5hdG9yJztcbmltcG9ydCB7IE1hdFNvcnQgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zb3J0JztcbmltcG9ydCB7IEFic3RyYWN0V2lkZ2V0LCBDb250ZXh0LCBFeHByZXNzaW9ucywgcGFyc2VEZWZPYmplY3QgfSBmcm9tICcuLi8uLi8uLi9jb3JlL2luZGV4JztcbmltcG9ydCB7IGNvbWJpbmVNaXhlZCB9IGZyb20gJ2VzcHJlc3Npb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd3ZGctdGFibGUnLFxuICB0ZW1wbGF0ZTogYDxkaXY+XG4gIDxzZWN0aW9uIGNsYXNzPVwidGFibGUtdGl0bGVcIj5cbiAgICA8aDY+e3t0aXRsZX19PC9oNj5cblxuICAgIDxkaXYgY2xhc3M9XCJzcGFjZXJcIj48L2Rpdj5cblxuICAgIDxtYXQtZm9ybS1maWVsZCAqbmdJZj1cImZpbHRlckJ5XCI+XG4gICAgICA8aW5wdXQgbWF0SW5wdXQgKGtleXVwKT1cImFwcGx5RmlsdGVyKCRldmVudC50YXJnZXQudmFsdWUpXCIgcGxhY2Vob2xkZXI9XCJGaWx0ZXJcIj5cbiAgICA8L21hdC1mb3JtLWZpZWxkPlxuICA8L3NlY3Rpb24+XG5cbiAgPHNlY3Rpb24gY2xhc3M9XCJtYXQtZWxldmF0aW9uLXoxXCI+XG4gICAgPHRhYmxlIG1hdC10YWJsZSBbZGF0YVNvdXJjZV09XCJ0YWJsZURhdGFTb3VyY2VcIiBtYXRTb3J0IFttYXRTb3J0RGlzYWJsZWRdPVwiIWRpc2FibGVTb3J0XCI+XG5cbiAgICAgIDwhLS0gRHluYW1pYyBDb2x1bW4gZGVmaW5pdGlvbnMtLT5cbiAgICAgIDxuZy1jb250YWluZXIgW21hdENvbHVtbkRlZl09XCJjb2xLZXlcIiAqbmdGb3I9XCJsZXQgY29sS2V5IG9mIGNvbEtleXM7IGluZGV4IGFzIGNvbEluZGV4XCI+XG4gICAgICAgIDx0aCBtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWYgbWF0LXNvcnQtaGVhZGVyIFtkaXNhYmxlZF09XCJkaXNhYmxlU29ydD8uaW5kZXhPZihjb2xLZXkpID49IDBcIj4ge3tjb2xIZWFkZXJzW2NvbEluZGV4XSB8fCBjb2xLZXl9fSA8L3RoPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sRm9ybWF0ICYmIGNvbEZvcm1hdFtjb2xJbmRleF07IGVsc2Ugbm9Gb3JtYXRDZWxsRGVmXCI+XG4gICAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd0RhdGFcIj57e3Jvd0RhdGFbY29sS2V5XSB8IGZvcm1hdDpjb2xGb3JtYXRbY29sSW5kZXhdfX08L3RkPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLXRlbXBsYXRlICNub0Zvcm1hdENlbGxEZWY+XG4gICAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd0RhdGFcIj57e3Jvd0RhdGFbY29sS2V5XX19PC90ZD5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiYWN0aW9ucz8ubGVuZ3RoXCIgW21hdENvbHVtbkRlZl09XCInX19hY3Rpb25zX18nXCI+XG4gICAgICAgIDx0aCBtYXQtaGVhZGVyLWNlbGwgKm1hdEhlYWRlckNlbGxEZWYgPiB7e2FjdGlvbnNIZWFkZXIgfHwgJ0FjdGlvbnMnfX0gPC90aD5cbiAgICAgICAgPHRkIG1hdC1jZWxsICptYXRDZWxsRGVmPVwibGV0IHJvd0RhdGFcIj5cbiAgICAgICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBbbWF0TWVudVRyaWdnZXJGb3JdPVwibWVudVwiPlxuICAgICAgICAgICAgPG1hdC1pY29uIHN2Z0ljb249XCJkb3RzLXZlcnRpY2FsXCI+PC9tYXQtaWNvbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8bWF0LW1lbnUgI21lbnU9XCJtYXRNZW51XCI+XG5cbiAgICAgICAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbSAqbmdGb3I9XCJsZXQgYWN0aW9uIG9mIGFjdGlvbnM7IGluZGV4IGFzIGFjdGlvbkluZGV4XCIgKGNsaWNrKT1cImFjdGlvbkNsaWNrKHJvd0RhdGEsIGFjdGlvbkluZGV4KVwiPlxuICAgICAgICAgICAgICA8bWF0LWljb24gW3N2Z0ljb25dPVwiYWN0aW9uc1thY3Rpb25JbmRleF0uaWNvblwiPjwvbWF0LWljb24+XG4gICAgICAgICAgICAgIDxzcGFuPnt7YWN0aW9uc1thY3Rpb25JbmRleF0ubGFiZWx9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvbWF0LW1lbnU+XG4gICAgICAgIDwvdGQ+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuXG4gICAgICA8IS0tIFJvdyBkZWZpbml0aW9ucy0tPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbEhlYWRlcnNcIj5cbiAgICAgICAgPHRyIG1hdC1oZWFkZXItcm93ICptYXRIZWFkZXJSb3dEZWY9XCJzaG93Q29sc1wiIGNsYXNzPVwiaGVhZGVyLXJvd1wiPjwvdHI+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDx0ciBtYXQtcm93ICptYXRSb3dEZWY9XCJsZXQgZWxlbWVudDsgY29sdW1uczogc2hvd0NvbHM7XCIgY2xhc3M9XCJkYXRhLXJvd1wiPjwvdHI+XG4gICAgPC90YWJsZT5cblxuICAgIDxtYXQtcGFnaW5hdG9yIFtjbGFzcy5oaWRkZW5QYWdpbmF0b3JdPVwiIXBhZ2VTaXplc1wiIFtwYWdlU2l6ZU9wdGlvbnNdPVwicGFnZVNpemVzXCIgW2hpZGVQYWdlU2l6ZV09XCJwYWdlU2l6ZXM/Lmxlbmd0aDw9MVwiPjwvbWF0LXBhZ2luYXRvcj5cbiAgPC9zZWN0aW9uPlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgZHluLXRhYmxlIHRhYmxle3dpZHRoOjEwMCV9ZHluLXRhYmxlIHRyLmRhdGEtcm93OmhvdmVye2JhY2tncm91bmQ6I2Y1ZjVmNX1keW4tdGFibGUgdHIuZGF0YS1yb3c6YWN0aXZle2JhY2tncm91bmQ6I2VmZWZlZn1keW4tdGFibGUgLmRhdGEtcm93IHRke2JvcmRlci1ib3R0b20td2lkdGg6MH1keW4tdGFibGUgbWF0LXBhZ2luYXRvci5oaWRkZW5QYWdpbmF0b3J7ZGlzcGxheTpub25lfWR5bi10YWJsZSAudGFibGUtdGl0bGV7ZGlzcGxheTpmbGV4O2ZsZXgtZmxvdzpyb3d9ZHluLXRhYmxlIC50YWJsZS10aXRsZT4qe2ZsZXg6MCAwIGF1dG99ZHluLXRhYmxlIC50YWJsZS10aXRsZSAuc3BhY2Vye2ZsZXg6MSAxIGF1dG99YF0sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlV2lkZ2V0Q29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RXaWRnZXQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHRpdGxlOiBzdHJpbmc7XG4gIGRhdGFTb3VyY2U6IE9ic2VydmFibGU8YW55W10+IHwgYW55W107XG4gIHRhYmxlRGF0YVNvdXJjZTogTWF0VGFibGVEYXRhU291cmNlPHsgW3Byb3A6IHN0cmluZ106IGFueSB9PjtcblxuICBjb2xLZXlzOiBzdHJpbmdbXTtcbiAgY29sSGVhZGVyczogc3RyaW5nW107XG4gIGNvbHNWaXNpYmxlOiBzdHJpbmdbXTtcbiAgcGFnZVNpemVzOiBudW1iZXJbXTtcbiAgZmlsdGVyQnk6IHN0cmluZ1tdO1xuICBkaXNhYmxlU29ydDogc3RyaW5nW10gPSBbXTtcblxuICBjb2xUcmFuc2Zvcm06IHN0cmluZ1tdO1xuICBjb2xGb3JtYXQ6IHN0cmluZ1tdO1xuXG4gIGFjdGlvbnM6IHsgaWNvbjogc3RyaW5nLCBsYWJlbDogc3RyaW5nLCBhY3Rpb246IHN0cmluZyB9W10gPSBbXTtcbiAgYWN0aW9uc0hlYWRlcjogc3RyaW5nO1xuICBzaG93Q29sczogc3RyaW5nW107XG5cbiAgQFZpZXdDaGlsZChNYXRQYWdpbmF0b3IpIHBhZ2luYXRvcjogTWF0UGFnaW5hdG9yO1xuICBAVmlld0NoaWxkKE1hdFNvcnQpIHNvcnQ6IE1hdFNvcnQ7XG5cbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZXhwcjogRXhwcmVzc2lvbnMpIHtcbiAgICBzdXBlcihjZHIsIGV4cHIpO1xuICAgIHRoaXMudGFibGVEYXRhU291cmNlID0gbmV3IE1hdFRhYmxlRGF0YVNvdXJjZSgpO1xuICB9XG5cbiAgZHluT25CZWZvcmVCaW5kKCkge1xuXG4gICAgY29uc3Qgb3B0ID0gdGhpcy53aWRnZXREZWYub3B0aW9ucztcblxuXG4gICAgLy8gaWYgdGhlIG9ubHkgc291cmNlIGlzIGEgc3RhdGljIGFycmF5LCBsZXRzIGNoZWNrIGlmIGl0IGhhcyAncHJvcGVydHk9JyBjb2x1bW5zIHRvIGV2YWx1YXRlXG4gICAgLy8gYW5kIGFkZCB0aGUgYXV0byBiaW5kaW5nXG4gICAgaWYgKG9wdCAmJiAhb3B0WydkYXRhU291cmNlPSddICYmXG4gICAgICBBcnJheS5pc0FycmF5KG9wdC5kYXRhU291cmNlKSkge1xuXG4gICAgICBjb25zdCBkYXRhU291cmNlID0gPE9ic2VydmFibGU8YW55W10+PmNvbWJpbmVNaXhlZChvcHQuZGF0YVNvdXJjZS5tYXAocm93ID0+XG4gICAgICAgIGNvbWJpbmVNaXhlZChwYXJzZURlZk9iamVjdChyb3csIHRoaXMuY29udGV4dCwgZmFsc2UsIHRoaXMuX2V4cHIpKSwgZmFsc2UpLCBmYWxzZSk7XG4gICAgICBpZiAoaXNPYnNlcnZhYmxlKGRhdGFTb3VyY2UpKSB0aGlzLmJpbmRpbmdzLmRhdGFTb3VyY2UgPSBkYXRhU291cmNlO1xuICAgICAgZWxzZSB0aGlzLmRhdGFTb3VyY2UgPSBkYXRhU291cmNlO1xuICAgIH1cblxuXG4gICAgdGhpcy5tYXAoJ2Rpc2FibGVTb3J0Jywgc29ydCA9PiB7XG4gICAgICBpZiAoc29ydCA9PT0gdHJ1ZSkgcmV0dXJuIG51bGw7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoc29ydCkpIHJldHVybiBbXTtcbiAgICAgIHJldHVybiBzb3J0O1xuXG4gICAgfSk7XG5cbiAgICB0aGlzLm1hcCgnZGF0YVNvdXJjZScsICh0YWJsZTogYW55W10pID0+XG4gICAgICB0aGlzLnRhYmxlRGF0YVNvdXJjZS5kYXRhID0gdGFibGUubWFwKHJvdyA9PiB7XG4gICAgICAgIHJvdyA9IHBhcnNlRGVmT2JqZWN0KHJvdywgQ29udGV4dC5jcmVhdGUodGhpcy5jb250ZXh0LCB7ICRkYXRhOiByb3cgfSksIGZhbHNlLCB0aGlzLl9leHByKTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmNvbFRyYW5zZm9ybSkpIHtcblxuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb2xUcmFuc2Zvcm0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbFRyYW5zZm9ybVtpXSkge1xuICAgICAgICAgICAgICBjb25zdCBjb250ZXh0OiBhbnkgPSBDb250ZXh0LmNyZWF0ZSh0aGlzLmNvbnRleHQpO1xuICAgICAgICAgICAgICBjb250ZXh0LiRkYXRhID0gcm93W3RoaXMuY29sS2V5c1tpXV07XG4gICAgICAgICAgICAgIHJvd1t0aGlzLmNvbEtleXNbaV1dID0gdGhpcy5fZXhwci5ldmFsKHRoaXMuY29sVHJhbnNmb3JtW2ldLCBjb250ZXh0LCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcm93O1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgdGhpcy5tYXAoJ3BhZ2VTaXplcycsICh2YWx1ZSkgPT4ge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSB8fCAhdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMudGFibGVEYXRhU291cmNlLnBhZ2luYXRvciA9IG51bGw7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgdGhpcy50YWJsZURhdGFTb3VyY2UucGFnaW5hdG9yID0gdGhpcy5wYWdpbmF0b3I7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSk7XG5cbiAgICB0aGlzLm1hcCgnY29sS2V5cycsIGtleXMgPT4ge1xuICAgICAgaWYgKHRoaXMuYWN0aW9ucyAmJiB0aGlzLmFjdGlvbnMubGVuZ3RoKSB0aGlzLnNob3dDb2xzID0ga2V5cy5jb25jYXQoJ19fYWN0aW9uc19fJyk7XG4gICAgICBlbHNlIHRoaXMuc2hvd0NvbHMgPSBrZXlzO1xuICAgICAgcmV0dXJuIGtleXM7XG4gICAgfSk7XG4gICAgdGhpcy5tYXAoJ2FjdGlvbnMnLCBhY3Rpb25zID0+IHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShhY3Rpb25zKSkgYWN0aW9ucyA9IFtdO1xuXG4gICAgICB0aGlzLnNob3dDb2xzID0gYWN0aW9ucy5sZW5ndGggPyB0aGlzLmNvbEtleXMuY29uY2F0KCdfX2FjdGlvbnNfXycpIDogdGhpcy5jb2xLZXlzO1xuXG4gICAgICByZXR1cm4gYWN0aW9ucztcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICB0aGlzLnRhYmxlRGF0YVNvdXJjZS5zb3J0ID0gdGhpcy5zb3J0O1xuICB9XG4gIGFwcGx5RmlsdGVyKGZpbHRlclZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnRhYmxlRGF0YVNvdXJjZS5maWx0ZXIgPSBmaWx0ZXJWYWx1ZTtcblxuICAgIGlmICh0aGlzLnRhYmxlRGF0YVNvdXJjZS5wYWdpbmF0b3IpIHtcbiAgICAgIHRoaXMudGFibGVEYXRhU291cmNlLnBhZ2luYXRvci5maXJzdFBhZ2UoKTtcbiAgICB9XG4gIH1cblxuICBhY3Rpb25DbGljayhyb3dEYXRhOiBhbnksIGFjdGlvbkluZGV4OiBudW1iZXIpIHtcblxuICAgIGNvbnN0IGNvbnRleHQgPSBDb250ZXh0LmNyZWF0ZSh0aGlzLmNvbnRleHQsIHsgJGRhdGE6IHJvd0RhdGEgfSk7XG5cbiAgICB0aGlzLmFkZFN1YnNjcmlwdGlvbiA9IHRoaXMuX2V4cHIuZXZhbCh0aGlzLmFjdGlvbnNbYWN0aW9uSW5kZXhdLmFjdGlvbiwgY29udGV4dCwgdHJ1ZSkuc3Vic2NyaWJlKFxuICAgICAgKCkgPT4ge1xuICAgICAgICAvLyBUT0RPIGxvZ2ljIHRvIHJlbG9hZCB0YWJsZVxuICAgICAgfVxuICAgICk7XG4gIH1cblxuXG59XG4iXX0=