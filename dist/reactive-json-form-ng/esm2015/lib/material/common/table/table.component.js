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
import { AbstractWidget, Context, Expressions, parseDefObject } from '../../../core';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nLyIsInNvdXJjZXMiOlsibGliL21hdGVyaWFsL2NvbW1vbi90YWJsZS90YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsaUJBQWlCLEVBQUUsdUJBQXVCLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNILE9BQU8sRUFBYyxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDaEQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxZQUFZLENBQUM7QUE2RDFDLE1BQU0sMkJBQTRCLFNBQVEsY0FBYzs7Ozs7SUF1QnRELFlBQVksR0FBc0IsRUFBRSxJQUFpQjtRQUNuRCxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDOzJCQWJLLEVBQUU7dUJBS21DLEVBQUU7UUFTN0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGtCQUFrQixFQUFFLENBQUM7S0FDakQ7Ozs7SUFFRCxlQUFlO1FBRWIsdUJBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDOzs7UUFLbkMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztZQUM1QixLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsZUFBWSxDQUFDLENBQUMsQ0FBQztZ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QW1CO1FBRTNDLHVCQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUVqRSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQy9GLEdBQUcsRUFBRTs7U0FFSixDQUNGLENBQUM7S0FDSDs7O1lBaExGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBb0RYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLG9XQUFvVyxDQUFDO2dCQUM5VyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7Ozs7WUFsRXVFLGlCQUFpQjtZQUt2RCxXQUFXOzs7d0JBa0YxQyxTQUFTLFNBQUMsWUFBWTttQkFDdEIsU0FBUyxTQUFDLE9BQU8iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxOCBBZHJpYW4gUGFuZWxsYSA8aWFuY2hpNzRAb3V0bG9vay5jb20+XG4gKlxuICogVGhpcyBzb2Z0d2FyZSBpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKiBodHRwczovL29wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL01JVFxuICovXG5cblxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBpc09ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1hdFRhYmxlRGF0YVNvdXJjZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3RhYmxlJztcbmltcG9ydCB7IE1hdFBhZ2luYXRvciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3BhZ2luYXRvcic7XG5pbXBvcnQgeyBNYXRTb3J0IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc29ydCc7XG5pbXBvcnQgeyBBYnN0cmFjdFdpZGdldCwgQ29udGV4dCwgRXhwcmVzc2lvbnMsIHBhcnNlRGVmT2JqZWN0IH0gZnJvbSAnLi4vLi4vLi4vY29yZSc7XG5pbXBvcnQgeyBjb21iaW5lTWl4ZWQgfSBmcm9tICdlc3ByZXNzaW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnd2RnLXRhYmxlJyxcbiAgdGVtcGxhdGU6IGA8ZGl2PlxuICA8c2VjdGlvbiBjbGFzcz1cInRhYmxlLXRpdGxlXCI+XG4gICAgPGg2Pnt7dGl0bGV9fTwvaDY+XG5cbiAgICA8ZGl2IGNsYXNzPVwic3BhY2VyXCI+PC9kaXY+XG5cbiAgICA8bWF0LWZvcm0tZmllbGQgKm5nSWY9XCJmaWx0ZXJCeVwiPlxuICAgICAgPGlucHV0IG1hdElucHV0IChrZXl1cCk9XCJhcHBseUZpbHRlcigkZXZlbnQudGFyZ2V0LnZhbHVlKVwiIHBsYWNlaG9sZGVyPVwiRmlsdGVyXCI+XG4gICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgPC9zZWN0aW9uPlxuXG4gIDxzZWN0aW9uIGNsYXNzPVwibWF0LWVsZXZhdGlvbi16MVwiPlxuICAgIDx0YWJsZSBtYXQtdGFibGUgW2RhdGFTb3VyY2VdPVwidGFibGVEYXRhU291cmNlXCIgbWF0U29ydCBbbWF0U29ydERpc2FibGVkXT1cIiFkaXNhYmxlU29ydFwiPlxuXG4gICAgICA8IS0tIER5bmFtaWMgQ29sdW1uIGRlZmluaXRpb25zLS0+XG4gICAgICA8bmctY29udGFpbmVyIFttYXRDb2x1bW5EZWZdPVwiY29sS2V5XCIgKm5nRm9yPVwibGV0IGNvbEtleSBvZiBjb2xLZXlzOyBpbmRleCBhcyBjb2xJbmRleFwiPlxuICAgICAgICA8dGggbWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmIG1hdC1zb3J0LWhlYWRlciBbZGlzYWJsZWRdPVwiZGlzYWJsZVNvcnQ/LmluZGV4T2YoY29sS2V5KSA+PSAwXCI+IHt7Y29sSGVhZGVyc1tjb2xJbmRleF0gfHwgY29sS2V5fX0gPC90aD5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImNvbEZvcm1hdCAmJiBjb2xGb3JtYXRbY29sSW5kZXhdOyBlbHNlIG5vRm9ybWF0Q2VsbERlZlwiPlxuICAgICAgICAgIDx0ZCBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dEYXRhXCI+e3tyb3dEYXRhW2NvbEtleV0gfCBmb3JtYXQ6Y29sRm9ybWF0W2NvbEluZGV4XX19PC90ZD5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjbm9Gb3JtYXRDZWxsRGVmPlxuICAgICAgICAgIDx0ZCBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dEYXRhXCI+e3tyb3dEYXRhW2NvbEtleV19fTwvdGQ+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImFjdGlvbnM/Lmxlbmd0aFwiIFttYXRDb2x1bW5EZWZdPVwiJ19fYWN0aW9uc19fJ1wiPlxuICAgICAgICA8dGggbWF0LWhlYWRlci1jZWxsICptYXRIZWFkZXJDZWxsRGVmID4ge3thY3Rpb25zSGVhZGVyIHx8ICdBY3Rpb25zJ319IDwvdGg+XG4gICAgICAgIDx0ZCBtYXQtY2VsbCAqbWF0Q2VsbERlZj1cImxldCByb3dEYXRhXCI+XG4gICAgICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gW21hdE1lbnVUcmlnZ2VyRm9yXT1cIm1lbnVcIj5cbiAgICAgICAgICAgIDxtYXQtaWNvbiBzdmdJY29uPVwiZG90cy12ZXJ0aWNhbFwiPjwvbWF0LWljb24+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPG1hdC1tZW51ICNtZW51PVwibWF0TWVudVwiPlxuXG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1tZW51LWl0ZW0gKm5nRm9yPVwibGV0IGFjdGlvbiBvZiBhY3Rpb25zOyBpbmRleCBhcyBhY3Rpb25JbmRleFwiIChjbGljayk9XCJhY3Rpb25DbGljayhyb3dEYXRhLCBhY3Rpb25JbmRleClcIj5cbiAgICAgICAgICAgICAgPG1hdC1pY29uIFtzdmdJY29uXT1cImFjdGlvbnNbYWN0aW9uSW5kZXhdLmljb25cIj48L21hdC1pY29uPlxuICAgICAgICAgICAgICA8c3Bhbj57e2FjdGlvbnNbYWN0aW9uSW5kZXhdLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L21hdC1tZW51PlxuICAgICAgICA8L3RkPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cblxuICAgICAgPCEtLSBSb3cgZGVmaW5pdGlvbnMtLT5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2xIZWFkZXJzXCI+XG4gICAgICAgIDx0ciBtYXQtaGVhZGVyLXJvdyAqbWF0SGVhZGVyUm93RGVmPVwic2hvd0NvbHNcIiBjbGFzcz1cImhlYWRlci1yb3dcIj48L3RyPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8dHIgbWF0LXJvdyAqbWF0Um93RGVmPVwibGV0IGVsZW1lbnQ7IGNvbHVtbnM6IHNob3dDb2xzO1wiIGNsYXNzPVwiZGF0YS1yb3dcIj48L3RyPlxuICAgIDwvdGFibGU+XG5cbiAgICA8bWF0LXBhZ2luYXRvciBbY2xhc3MuaGlkZGVuUGFnaW5hdG9yXT1cIiFwYWdlU2l6ZXNcIiBbcGFnZVNpemVPcHRpb25zXT1cInBhZ2VTaXplc1wiIFtoaWRlUGFnZVNpemVdPVwicGFnZVNpemVzPy5sZW5ndGg8PTFcIj48L21hdC1wYWdpbmF0b3I+XG4gIDwvc2VjdGlvbj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYGR5bi10YWJsZSB0YWJsZXt3aWR0aDoxMDAlfWR5bi10YWJsZSB0ci5kYXRhLXJvdzpob3ZlcntiYWNrZ3JvdW5kOiNmNWY1ZjV9ZHluLXRhYmxlIHRyLmRhdGEtcm93OmFjdGl2ZXtiYWNrZ3JvdW5kOiNlZmVmZWZ9ZHluLXRhYmxlIC5kYXRhLXJvdyB0ZHtib3JkZXItYm90dG9tLXdpZHRoOjB9ZHluLXRhYmxlIG1hdC1wYWdpbmF0b3IuaGlkZGVuUGFnaW5hdG9ye2Rpc3BsYXk6bm9uZX1keW4tdGFibGUgLnRhYmxlLXRpdGxle2Rpc3BsYXk6ZmxleDtmbGV4LWZsb3c6cm93fWR5bi10YWJsZSAudGFibGUtdGl0bGU+KntmbGV4OjAgMCBhdXRvfWR5bi10YWJsZSAudGFibGUtdGl0bGUgLnNwYWNlcntmbGV4OjEgMSBhdXRvfWBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZVdpZGdldENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0V2lkZ2V0IGltcGxlbWVudHMgT25Jbml0IHtcblxuICB0aXRsZTogc3RyaW5nO1xuICBkYXRhU291cmNlOiBPYnNlcnZhYmxlPGFueVtdPiB8IGFueVtdO1xuICB0YWJsZURhdGFTb3VyY2U6IE1hdFRhYmxlRGF0YVNvdXJjZTx7IFtwcm9wOiBzdHJpbmddOiBhbnkgfT47XG5cbiAgY29sS2V5czogc3RyaW5nW107XG4gIGNvbEhlYWRlcnM6IHN0cmluZ1tdO1xuICBjb2xzVmlzaWJsZTogc3RyaW5nW107XG4gIHBhZ2VTaXplczogbnVtYmVyW107XG4gIGZpbHRlckJ5OiBzdHJpbmdbXTtcbiAgZGlzYWJsZVNvcnQ6IHN0cmluZ1tdID0gW107XG5cbiAgY29sVHJhbnNmb3JtOiBzdHJpbmdbXTtcbiAgY29sRm9ybWF0OiBzdHJpbmdbXTtcblxuICBhY3Rpb25zOiB7IGljb246IHN0cmluZywgbGFiZWw6IHN0cmluZywgYWN0aW9uOiBzdHJpbmcgfVtdID0gW107XG4gIGFjdGlvbnNIZWFkZXI6IHN0cmluZztcbiAgc2hvd0NvbHM6IHN0cmluZ1tdO1xuXG4gIEBWaWV3Q2hpbGQoTWF0UGFnaW5hdG9yKSBwYWdpbmF0b3I6IE1hdFBhZ2luYXRvcjtcbiAgQFZpZXdDaGlsZChNYXRTb3J0KSBzb3J0OiBNYXRTb3J0O1xuXG4gIGNvbnN0cnVjdG9yKGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIGV4cHI6IEV4cHJlc3Npb25zKSB7XG4gICAgc3VwZXIoY2RyLCBleHByKTtcbiAgICB0aGlzLnRhYmxlRGF0YVNvdXJjZSA9IG5ldyBNYXRUYWJsZURhdGFTb3VyY2UoKTtcbiAgfVxuXG4gIGR5bk9uQmVmb3JlQmluZCgpIHtcblxuICAgIGNvbnN0IG9wdCA9IHRoaXMud2lkZ2V0RGVmLm9wdGlvbnM7XG5cblxuICAgIC8vIGlmIHRoZSBvbmx5IHNvdXJjZSBpcyBhIHN0YXRpYyBhcnJheSwgbGV0cyBjaGVjayBpZiBpdCBoYXMgJ3Byb3BlcnR5PScgY29sdW1ucyB0byBldmFsdWF0ZVxuICAgIC8vIGFuZCBhZGQgdGhlIGF1dG8gYmluZGluZ1xuICAgIGlmIChvcHQgJiYgIW9wdFsnZGF0YVNvdXJjZT0nXSAmJlxuICAgICAgQXJyYXkuaXNBcnJheShvcHQuZGF0YVNvdXJjZSkpIHtcblxuICAgICAgY29uc3QgZGF0YVNvdXJjZSA9IDxPYnNlcnZhYmxlPGFueVtdPj5jb21iaW5lTWl4ZWQob3B0LmRhdGFTb3VyY2UubWFwKHJvdyA9PlxuICAgICAgICBjb21iaW5lTWl4ZWQocGFyc2VEZWZPYmplY3Qocm93LCB0aGlzLmNvbnRleHQsIGZhbHNlLCB0aGlzLl9leHByKSksIGZhbHNlKSwgZmFsc2UpO1xuICAgICAgaWYgKGlzT2JzZXJ2YWJsZShkYXRhU291cmNlKSkgdGhpcy5iaW5kaW5ncy5kYXRhU291cmNlID0gZGF0YVNvdXJjZTtcbiAgICAgIGVsc2UgdGhpcy5kYXRhU291cmNlID0gZGF0YVNvdXJjZTtcbiAgICB9XG5cblxuICAgIHRoaXMubWFwKCdkaXNhYmxlU29ydCcsIHNvcnQgPT4ge1xuICAgICAgaWYgKHNvcnQgPT09IHRydWUpIHJldHVybiBudWxsO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHNvcnQpKSByZXR1cm4gW107XG4gICAgICByZXR1cm4gc29ydDtcblxuICAgIH0pO1xuXG4gICAgdGhpcy5tYXAoJ2RhdGFTb3VyY2UnLCAodGFibGU6IGFueVtdKSA9PlxuICAgICAgdGhpcy50YWJsZURhdGFTb3VyY2UuZGF0YSA9IHRhYmxlLm1hcChyb3cgPT4ge1xuICAgICAgICByb3cgPSBwYXJzZURlZk9iamVjdChyb3csIENvbnRleHQuY3JlYXRlKHRoaXMuY29udGV4dCwgeyAkZGF0YTogcm93IH0pLCBmYWxzZSwgdGhpcy5fZXhwcik7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5jb2xUcmFuc2Zvcm0pKSB7XG5cbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29sVHJhbnNmb3JtLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb2xUcmFuc2Zvcm1baV0pIHtcbiAgICAgICAgICAgICAgY29uc3QgY29udGV4dDogYW55ID0gQ29udGV4dC5jcmVhdGUodGhpcy5jb250ZXh0KTtcbiAgICAgICAgICAgICAgY29udGV4dC4kZGF0YSA9IHJvd1t0aGlzLmNvbEtleXNbaV1dO1xuICAgICAgICAgICAgICByb3dbdGhpcy5jb2xLZXlzW2ldXSA9IHRoaXMuX2V4cHIuZXZhbCh0aGlzLmNvbFRyYW5zZm9ybVtpXSwgY29udGV4dCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJvdztcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMubWFwKCdwYWdlU2l6ZXMnLCAodmFsdWUpID0+IHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgIXZhbHVlLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnRhYmxlRGF0YVNvdXJjZS5wYWdpbmF0b3IgPSBudWxsO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHRoaXMudGFibGVEYXRhU291cmNlLnBhZ2luYXRvciA9IHRoaXMucGFnaW5hdG9yO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0pO1xuXG4gICAgdGhpcy5tYXAoJ2NvbEtleXMnLCBrZXlzID0+IHtcbiAgICAgIGlmICh0aGlzLmFjdGlvbnMgJiYgdGhpcy5hY3Rpb25zLmxlbmd0aCkgdGhpcy5zaG93Q29scyA9IGtleXMuY29uY2F0KCdfX2FjdGlvbnNfXycpO1xuICAgICAgZWxzZSB0aGlzLnNob3dDb2xzID0ga2V5cztcbiAgICAgIHJldHVybiBrZXlzO1xuICAgIH0pO1xuICAgIHRoaXMubWFwKCdhY3Rpb25zJywgYWN0aW9ucyA9PiB7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkoYWN0aW9ucykpIGFjdGlvbnMgPSBbXTtcblxuICAgICAgdGhpcy5zaG93Q29scyA9IGFjdGlvbnMubGVuZ3RoID8gdGhpcy5jb2xLZXlzLmNvbmNhdCgnX19hY3Rpb25zX18nKSA6IHRoaXMuY29sS2V5cztcblxuICAgICAgcmV0dXJuIGFjdGlvbnM7XG4gICAgfSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuXG4gICAgdGhpcy50YWJsZURhdGFTb3VyY2Uuc29ydCA9IHRoaXMuc29ydDtcbiAgfVxuICBhcHBseUZpbHRlcihmaWx0ZXJWYWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy50YWJsZURhdGFTb3VyY2UuZmlsdGVyID0gZmlsdGVyVmFsdWU7XG5cbiAgICBpZiAodGhpcy50YWJsZURhdGFTb3VyY2UucGFnaW5hdG9yKSB7XG4gICAgICB0aGlzLnRhYmxlRGF0YVNvdXJjZS5wYWdpbmF0b3IuZmlyc3RQYWdlKCk7XG4gICAgfVxuICB9XG5cbiAgYWN0aW9uQ2xpY2socm93RGF0YTogYW55LCBhY3Rpb25JbmRleDogbnVtYmVyKSB7XG5cbiAgICBjb25zdCBjb250ZXh0ID0gQ29udGV4dC5jcmVhdGUodGhpcy5jb250ZXh0LCB7ICRkYXRhOiByb3dEYXRhIH0pO1xuXG4gICAgdGhpcy5hZGRTdWJzY3JpcHRpb24gPSB0aGlzLl9leHByLmV2YWwodGhpcy5hY3Rpb25zW2FjdGlvbkluZGV4XS5hY3Rpb24sIGNvbnRleHQsIHRydWUpLnN1YnNjcmliZShcbiAgICAgICgpID0+IHtcbiAgICAgICAgLy8gVE9ETyBsb2dpYyB0byByZWxvYWQgdGFibGVcbiAgICAgIH1cbiAgICApO1xuICB9XG5cblxufVxuIl19