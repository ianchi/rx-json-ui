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
import * as tslib_1 from "tslib";
import { Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { isObservable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AbstractWidget, Context, Expressions, parseDefObject } from '../../../core/index';
import { combineMixed } from 'espression';
var TableWidgetComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TableWidgetComponent, _super);
    function TableWidgetComponent(cdr, expr) {
        var _this = _super.call(this, cdr, expr) || this;
        _this.disableSort = [];
        _this.actions = [];
        _this.tableDataSource = new MatTableDataSource();
        return _this;
    }
    /**
     * @return {?}
     */
    TableWidgetComponent.prototype.dynOnBeforeBind = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ opt = this.widgetDef.options;
        // if the only source is a static array, lets check if it has 'property=' columns to evaluate
        // and add the auto binding
        if (opt && !opt['dataSource='] &&
            Array.isArray(opt["dataSource"])) {
            var /** @type {?} */ dataSource = /** @type {?} */ (combineMixed(opt["dataSource"].map(function (row) {
                return combineMixed(parseDefObject(row, _this.context, false, _this._expr));
            }, false), false));
            if (isObservable(dataSource))
                this.bindings["dataSource"] = dataSource;
            else
                this.dataSource = dataSource;
        }
        this.map('disableSort', function (sort) {
            if (sort === true)
                return null;
            if (!Array.isArray(sort))
                return [];
            return sort;
        });
        this.map('dataSource', function (table) {
            return _this.tableDataSource.data = table.map(function (row) {
                row = parseDefObject(row, Context.create(_this.context, { $data: row }), false, _this._expr);
                if (Array.isArray(_this.colTransform)) {
                    for (var /** @type {?} */ i = 0; i < _this.colTransform.length; i++) {
                        if (_this.colTransform[i]) {
                            var /** @type {?} */ context = Context.create(_this.context);
                            context.$data = row[_this.colKeys[i]];
                            row[_this.colKeys[i]] = _this._expr.eval(_this.colTransform[i], context, false);
                        }
                    }
                }
                return row;
            });
        });
        this.map('pageSizes', function (value) {
            if (!Array.isArray(value) || !value.length) {
                _this.tableDataSource.paginator = null;
                return null;
            }
            _this.tableDataSource.paginator = _this.paginator;
            return value;
        });
        this.map('colKeys', function (keys) {
            if (_this.actions && _this.actions.length)
                _this.showCols = keys.concat('__actions__');
            else
                _this.showCols = keys;
            return keys;
        });
        this.map('actions', function (actions) {
            if (!Array.isArray(actions))
                actions = [];
            _this.showCols = actions.length ? _this.colKeys.concat('__actions__') : _this.colKeys;
            return actions;
        });
    };
    /**
     * @return {?}
     */
    TableWidgetComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnInit.call(this);
        this.tableDataSource.sort = this.sort;
    };
    /**
     * @param {?} filterValue
     * @return {?}
     */
    TableWidgetComponent.prototype.applyFilter = /**
     * @param {?} filterValue
     * @return {?}
     */
    function (filterValue) {
        this.tableDataSource.filter = filterValue;
        if (this.tableDataSource.paginator) {
            this.tableDataSource.paginator.firstPage();
        }
    };
    /**
     * @param {?} rowData
     * @param {?} actionIndex
     * @return {?}
     */
    TableWidgetComponent.prototype.actionClick = /**
     * @param {?} rowData
     * @param {?} actionIndex
     * @return {?}
     */
    function (rowData, actionIndex) {
        var /** @type {?} */ context = Context.create(this.context, { $data: rowData });
        this.addSubscription = this._expr.eval(this.actions[actionIndex].action, context, true).subscribe(function () {
            // TODO logic to reload table
        });
    };
    TableWidgetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'wdg-table',
                    template: "<div>\n  <section class=\"table-title\">\n    <h6>{{title}}</h6>\n\n    <div class=\"spacer\"></div>\n\n    <mat-form-field *ngIf=\"filterBy\">\n      <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\n    </mat-form-field>\n  </section>\n\n  <section class=\"mat-elevation-z1\">\n    <table mat-table [dataSource]=\"tableDataSource\" matSort [matSortDisabled]=\"!disableSort\">\n\n      <!-- Dynamic Column definitions-->\n      <ng-container [matColumnDef]=\"colKey\" *ngFor=\"let colKey of colKeys; index as colIndex\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header [disabled]=\"disableSort?.indexOf(colKey) >= 0\"> {{colHeaders[colIndex] || colKey}} </th>\n        <ng-container *ngIf=\"colFormat && colFormat[colIndex]; else noFormatCellDef\">\n          <td mat-cell *matCellDef=\"let rowData\">{{rowData[colKey] | format:colFormat[colIndex]}}</td>\n        </ng-container>\n        <ng-template #noFormatCellDef>\n          <td mat-cell *matCellDef=\"let rowData\">{{rowData[colKey]}}</td>\n        </ng-template>\n      </ng-container>\n\n      <ng-container *ngIf=\"actions?.length\" [matColumnDef]=\"'__actions__'\">\n        <th mat-header-cell *matHeaderCellDef > {{actionsHeader || 'Actions'}} </th>\n        <td mat-cell *matCellDef=\"let rowData\">\n          <button mat-icon-button [matMenuTriggerFor]=\"menu\">\n            <mat-icon svgIcon=\"dots-vertical\"></mat-icon>\n          </button>\n          <mat-menu #menu=\"matMenu\">\n\n            <button mat-menu-item *ngFor=\"let action of actions; index as actionIndex\" (click)=\"actionClick(rowData, actionIndex)\">\n              <mat-icon [svgIcon]=\"actions[actionIndex].icon\"></mat-icon>\n              <span>{{actions[actionIndex].label}}</span>\n            </button>\n          </mat-menu>\n        </td>\n      </ng-container>\n\n\n      <!-- Row definitions-->\n      <ng-container *ngIf=\"colHeaders\">\n        <tr mat-header-row *matHeaderRowDef=\"showCols\" class=\"header-row\"></tr>\n      </ng-container>\n      <tr mat-row *matRowDef=\"let element; columns: showCols;\" class=\"data-row\"></tr>\n    </table>\n\n    <mat-paginator [class.hiddenPaginator]=\"!pageSizes\" [pageSizeOptions]=\"pageSizes\" [hidePageSize]=\"pageSizes?.length<=1\"></mat-paginator>\n  </section>\n</div>\n",
                    styles: ["wdg-table table{width:100%}wdg-table tr.data-row:hover{background:#f5f5f5}wdg-table tr.data-row:active{background:#efefef}wdg-table .data-row td{border-bottom-width:0}wdg-table mat-paginator.hiddenPaginator{display:none}wdg-table .table-title{display:flex;flex-flow:row}wdg-table .table-title>*{flex:0 0 auto}wdg-table .table-title .spacer{flex:1 1 auto}"],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    TableWidgetComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: Expressions }
    ]; };
    TableWidgetComponent.propDecorators = {
        paginator: [{ type: ViewChild, args: [MatPaginator,] }],
        sort: [{ type: ViewChild, args: [MatSort,] }]
    };
    return TableWidgetComponent;
}(AbstractWidget));
export { TableWidgetComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vcmVhY3RpdmUtanNvbi1mb3JtLW5nLyIsInNvdXJjZXMiOlsibGliL21hdGVyaWFsL2NvbW1vbi90YWJsZS90YWJsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUUsU0FBUyxFQUFVLGlCQUFpQixFQUFFLHVCQUF1QixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzSCxPQUFPLEVBQWMsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzdELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDakQsT0FBTyxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzNGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxZQUFZLENBQUM7O0lBNkRBLGdEQUFjO0lBdUJ0RCw4QkFBWSxHQUFzQixFQUFFLElBQWlCO1FBQXJELFlBQ0Usa0JBQU0sR0FBRyxFQUFFLElBQUksQ0FBQyxTQUVqQjs0QkFmdUIsRUFBRTt3QkFLbUMsRUFBRTtRQVM3RCxLQUFJLENBQUMsZUFBZSxHQUFHLElBQUksa0JBQWtCLEVBQUUsQ0FBQzs7S0FDakQ7Ozs7SUFFRCw4Q0FBZTs7O0lBQWY7UUFBQSxpQkFpRUM7UUEvREMscUJBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDOzs7UUFLbkMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztZQUM1QixLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsZUFBWSxDQUFDLENB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Ozs7O0lBQVgsVUFBWSxPQUFZLEVBQUUsV0FBbUI7UUFFM0MscUJBQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRWpFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FDL0Y7O1NBRUMsQ0FDRixDQUFDO0tBQ0g7O2dCQWhMRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFFBQVEsRUFBRSx3eEVBb0RYO29CQUNDLE1BQU0sRUFBRSxDQUFDLG9XQUFvVyxDQUFDO29CQUM5VyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07aUJBQ2hEOzs7O2dCQWxFdUUsaUJBQWlCO2dCQUt2RCxXQUFXOzs7NEJBa0YxQyxTQUFTLFNBQUMsWUFBWTt1QkFDdEIsU0FBUyxTQUFDLE9BQU87OytCQWhHcEI7RUEyRTBDLGNBQWM7U0FBM0Msb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTggQWRyaWFuIFBhbmVsbGEgPGlhbmNoaTc0QG91dGxvb2suY29tPlxuICpcbiAqIFRoaXMgc29mdHdhcmUgaXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICogaHR0cHM6Ly9vcGVuc291cmNlLm9yZy9saWNlbnNlcy9NSVRcbiAqL1xuXG5cbmltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3RW5jYXBzdWxhdGlvbiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgaXNPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBNYXRUYWJsZURhdGFTb3VyY2UgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJsZSc7XG5pbXBvcnQgeyBNYXRQYWdpbmF0b3IgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wYWdpbmF0b3InO1xuaW1wb3J0IHsgTWF0U29ydCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NvcnQnO1xuaW1wb3J0IHsgQWJzdHJhY3RXaWRnZXQsIENvbnRleHQsIEV4cHJlc3Npb25zLCBwYXJzZURlZk9iamVjdCB9IGZyb20gJy4uLy4uLy4uL2NvcmUvaW5kZXgnO1xuaW1wb3J0IHsgY29tYmluZU1peGVkIH0gZnJvbSAnZXNwcmVzc2lvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3dkZy10YWJsZScsXG4gIHRlbXBsYXRlOiBgPGRpdj5cbiAgPHNlY3Rpb24gY2xhc3M9XCJ0YWJsZS10aXRsZVwiPlxuICAgIDxoNj57e3RpdGxlfX08L2g2PlxuXG4gICAgPGRpdiBjbGFzcz1cInNwYWNlclwiPjwvZGl2PlxuXG4gICAgPG1hdC1mb3JtLWZpZWxkICpuZ0lmPVwiZmlsdGVyQnlcIj5cbiAgICAgIDxpbnB1dCBtYXRJbnB1dCAoa2V5dXApPVwiYXBwbHlGaWx0ZXIoJGV2ZW50LnRhcmdldC52YWx1ZSlcIiBwbGFjZWhvbGRlcj1cIkZpbHRlclwiPlxuICAgIDwvbWF0LWZvcm0tZmllbGQ+XG4gIDwvc2VjdGlvbj5cblxuICA8c2VjdGlvbiBjbGFzcz1cIm1hdC1lbGV2YXRpb24tejFcIj5cbiAgICA8dGFibGUgbWF0LXRhYmxlIFtkYXRhU291cmNlXT1cInRhYmxlRGF0YVNvdXJjZVwiIG1hdFNvcnQgW21hdFNvcnREaXNhYmxlZF09XCIhZGlzYWJsZVNvcnRcIj5cblxuICAgICAgPCEtLSBEeW5hbWljIENvbHVtbiBkZWZpbml0aW9ucy0tPlxuICAgICAgPG5nLWNvbnRhaW5lciBbbWF0Q29sdW1uRGVmXT1cImNvbEtleVwiICpuZ0Zvcj1cImxldCBjb2xLZXkgb2YgY29sS2V5czsgaW5kZXggYXMgY29sSW5kZXhcIj5cbiAgICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZiBtYXQtc29ydC1oZWFkZXIgW2Rpc2FibGVkXT1cImRpc2FibGVTb3J0Py5pbmRleE9mKGNvbEtleSkgPj0gMFwiPiB7e2NvbEhlYWRlcnNbY29sSW5kZXhdIHx8IGNvbEtleX19IDwvdGg+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb2xGb3JtYXQgJiYgY29sRm9ybWF0W2NvbEluZGV4XTsgZWxzZSBub0Zvcm1hdENlbGxEZWZcIj5cbiAgICAgICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93RGF0YVwiPnt7cm93RGF0YVtjb2xLZXldIHwgZm9ybWF0OmNvbEZvcm1hdFtjb2xJbmRleF19fTwvdGQ+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctdGVtcGxhdGUgI25vRm9ybWF0Q2VsbERlZj5cbiAgICAgICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93RGF0YVwiPnt7cm93RGF0YVtjb2xLZXldfX08L3RkPlxuICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJhY3Rpb25zPy5sZW5ndGhcIiBbbWF0Q29sdW1uRGVmXT1cIidfX2FjdGlvbnNfXydcIj5cbiAgICAgICAgPHRoIG1hdC1oZWFkZXItY2VsbCAqbWF0SGVhZGVyQ2VsbERlZiA+IHt7YWN0aW9uc0hlYWRlciB8fCAnQWN0aW9ucyd9fSA8L3RoPlxuICAgICAgICA8dGQgbWF0LWNlbGwgKm1hdENlbGxEZWY9XCJsZXQgcm93RGF0YVwiPlxuICAgICAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIFttYXRNZW51VHJpZ2dlckZvcl09XCJtZW51XCI+XG4gICAgICAgICAgICA8bWF0LWljb24gc3ZnSWNvbj1cImRvdHMtdmVydGljYWxcIj48L21hdC1pY29uPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxtYXQtbWVudSAjbWVudT1cIm1hdE1lbnVcIj5cblxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtbWVudS1pdGVtICpuZ0Zvcj1cImxldCBhY3Rpb24gb2YgYWN0aW9uczsgaW5kZXggYXMgYWN0aW9uSW5kZXhcIiAoY2xpY2spPVwiYWN0aW9uQ2xpY2socm93RGF0YSwgYWN0aW9uSW5kZXgpXCI+XG4gICAgICAgICAgICAgIDxtYXQtaWNvbiBbc3ZnSWNvbl09XCJhY3Rpb25zW2FjdGlvbkluZGV4XS5pY29uXCI+PC9tYXQtaWNvbj5cbiAgICAgICAgICAgICAgPHNwYW4+e3thY3Rpb25zW2FjdGlvbkluZGV4XS5sYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9tYXQtbWVudT5cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG5cbiAgICAgIDwhLS0gUm93IGRlZmluaXRpb25zLS0+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY29sSGVhZGVyc1wiPlxuICAgICAgICA8dHIgbWF0LWhlYWRlci1yb3cgKm1hdEhlYWRlclJvd0RlZj1cInNob3dDb2xzXCIgY2xhc3M9XCJoZWFkZXItcm93XCI+PC90cj5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPHRyIG1hdC1yb3cgKm1hdFJvd0RlZj1cImxldCBlbGVtZW50OyBjb2x1bW5zOiBzaG93Q29scztcIiBjbGFzcz1cImRhdGEtcm93XCI+PC90cj5cbiAgICA8L3RhYmxlPlxuXG4gICAgPG1hdC1wYWdpbmF0b3IgW2NsYXNzLmhpZGRlblBhZ2luYXRvcl09XCIhcGFnZVNpemVzXCIgW3BhZ2VTaXplT3B0aW9uc109XCJwYWdlU2l6ZXNcIiBbaGlkZVBhZ2VTaXplXT1cInBhZ2VTaXplcz8ubGVuZ3RoPD0xXCI+PC9tYXQtcGFnaW5hdG9yPlxuICA8L3NlY3Rpb24+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2B3ZGctdGFibGUgdGFibGV7d2lkdGg6MTAwJX13ZGctdGFibGUgdHIuZGF0YS1yb3c6aG92ZXJ7YmFja2dyb3VuZDojZjVmNWY1fXdkZy10YWJsZSB0ci5kYXRhLXJvdzphY3RpdmV7YmFja2dyb3VuZDojZWZlZmVmfXdkZy10YWJsZSAuZGF0YS1yb3cgdGR7Ym9yZGVyLWJvdHRvbS13aWR0aDowfXdkZy10YWJsZSBtYXQtcGFnaW5hdG9yLmhpZGRlblBhZ2luYXRvcntkaXNwbGF5Om5vbmV9d2RnLXRhYmxlIC50YWJsZS10aXRsZXtkaXNwbGF5OmZsZXg7ZmxleC1mbG93OnJvd313ZGctdGFibGUgLnRhYmxlLXRpdGxlPip7ZmxleDowIDAgYXV0b313ZGctdGFibGUgLnRhYmxlLXRpdGxlIC5zcGFjZXJ7ZmxleDoxIDEgYXV0b31gXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5leHBvcnQgY2xhc3MgVGFibGVXaWRnZXRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdFdpZGdldCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgdGl0bGU6IHN0cmluZztcbiAgZGF0YVNvdXJjZTogT2JzZXJ2YWJsZTxhbnlbXT4gfCBhbnlbXTtcbiAgdGFibGVEYXRhU291cmNlOiBNYXRUYWJsZURhdGFTb3VyY2U8eyBbcHJvcDogc3RyaW5nXTogYW55IH0+O1xuXG4gIGNvbEtleXM6IHN0cmluZ1tdO1xuICBjb2xIZWFkZXJzOiBzdHJpbmdbXTtcbiAgY29sc1Zpc2libGU6IHN0cmluZ1tdO1xuICBwYWdlU2l6ZXM6IG51bWJlcltdO1xuICBmaWx0ZXJCeTogc3RyaW5nW107XG4gIGRpc2FibGVTb3J0OiBzdHJpbmdbXSA9IFtdO1xuXG4gIGNvbFRyYW5zZm9ybTogc3RyaW5nW107XG4gIGNvbEZvcm1hdDogc3RyaW5nW107XG5cbiAgYWN0aW9uczogeyBpY29uOiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcsIGFjdGlvbjogc3RyaW5nIH1bXSA9IFtdO1xuICBhY3Rpb25zSGVhZGVyOiBzdHJpbmc7XG4gIHNob3dDb2xzOiBzdHJpbmdbXTtcblxuICBAVmlld0NoaWxkKE1hdFBhZ2luYXRvcikgcGFnaW5hdG9yOiBNYXRQYWdpbmF0b3I7XG4gIEBWaWV3Q2hpbGQoTWF0U29ydCkgc29ydDogTWF0U29ydDtcblxuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBleHByOiBFeHByZXNzaW9ucykge1xuICAgIHN1cGVyKGNkciwgZXhwcik7XG4gICAgdGhpcy50YWJsZURhdGFTb3VyY2UgPSBuZXcgTWF0VGFibGVEYXRhU291cmNlKCk7XG4gIH1cblxuICBkeW5PbkJlZm9yZUJpbmQoKSB7XG5cbiAgICBjb25zdCBvcHQgPSB0aGlzLndpZGdldERlZi5vcHRpb25zO1xuXG5cbiAgICAvLyBpZiB0aGUgb25seSBzb3VyY2UgaXMgYSBzdGF0aWMgYXJyYXksIGxldHMgY2hlY2sgaWYgaXQgaGFzICdwcm9wZXJ0eT0nIGNvbHVtbnMgdG8gZXZhbHVhdGVcbiAgICAvLyBhbmQgYWRkIHRoZSBhdXRvIGJpbmRpbmdcbiAgICBpZiAob3B0ICYmICFvcHRbJ2RhdGFTb3VyY2U9J10gJiZcbiAgICAgIEFycmF5LmlzQXJyYXkob3B0LmRhdGFTb3VyY2UpKSB7XG5cbiAgICAgIGNvbnN0IGRhdGFTb3VyY2UgPSA8T2JzZXJ2YWJsZTxhbnlbXT4+Y29tYmluZU1peGVkKG9wdC5kYXRhU291cmNlLm1hcChyb3cgPT5cbiAgICAgICAgY29tYmluZU1peGVkKHBhcnNlRGVmT2JqZWN0KHJvdywgdGhpcy5jb250ZXh0LCBmYWxzZSwgdGhpcy5fZXhwcikpLCBmYWxzZSksIGZhbHNlKTtcbiAgICAgIGlmIChpc09ic2VydmFibGUoZGF0YVNvdXJjZSkpIHRoaXMuYmluZGluZ3MuZGF0YVNvdXJjZSA9IGRhdGFTb3VyY2U7XG4gICAgICBlbHNlIHRoaXMuZGF0YVNvdXJjZSA9IGRhdGFTb3VyY2U7XG4gICAgfVxuXG5cbiAgICB0aGlzLm1hcCgnZGlzYWJsZVNvcnQnLCBzb3J0ID0+IHtcbiAgICAgIGlmIChzb3J0ID09PSB0cnVlKSByZXR1cm4gbnVsbDtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShzb3J0KSkgcmV0dXJuIFtdO1xuICAgICAgcmV0dXJuIHNvcnQ7XG5cbiAgICB9KTtcblxuICAgIHRoaXMubWFwKCdkYXRhU291cmNlJywgKHRhYmxlOiBhbnlbXSkgPT5cbiAgICAgIHRoaXMudGFibGVEYXRhU291cmNlLmRhdGEgPSB0YWJsZS5tYXAocm93ID0+IHtcbiAgICAgICAgcm93ID0gcGFyc2VEZWZPYmplY3Qocm93LCBDb250ZXh0LmNyZWF0ZSh0aGlzLmNvbnRleHQsIHsgJGRhdGE6IHJvdyB9KSwgZmFsc2UsIHRoaXMuX2V4cHIpO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMuY29sVHJhbnNmb3JtKSkge1xuXG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvbFRyYW5zZm9ybS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuY29sVHJhbnNmb3JtW2ldKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGNvbnRleHQ6IGFueSA9IENvbnRleHQuY3JlYXRlKHRoaXMuY29udGV4dCk7XG4gICAgICAgICAgICAgIGNvbnRleHQuJGRhdGEgPSByb3dbdGhpcy5jb2xLZXlzW2ldXTtcbiAgICAgICAgICAgICAgcm93W3RoaXMuY29sS2V5c1tpXV0gPSB0aGlzLl9leHByLmV2YWwodGhpcy5jb2xUcmFuc2Zvcm1baV0sIGNvbnRleHQsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByb3c7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLm1hcCgncGFnZVNpemVzJywgKHZhbHVlKSA9PiB7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpIHx8ICF2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy50YWJsZURhdGFTb3VyY2UucGFnaW5hdG9yID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICB0aGlzLnRhYmxlRGF0YVNvdXJjZS5wYWdpbmF0b3IgPSB0aGlzLnBhZ2luYXRvcjtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9KTtcblxuICAgIHRoaXMubWFwKCdjb2xLZXlzJywga2V5cyA9PiB7XG4gICAgICBpZiAodGhpcy5hY3Rpb25zICYmIHRoaXMuYWN0aW9ucy5sZW5ndGgpIHRoaXMuc2hvd0NvbHMgPSBrZXlzLmNvbmNhdCgnX19hY3Rpb25zX18nKTtcbiAgICAgIGVsc2UgdGhpcy5zaG93Q29scyA9IGtleXM7XG4gICAgICByZXR1cm4ga2V5cztcbiAgICB9KTtcbiAgICB0aGlzLm1hcCgnYWN0aW9ucycsIGFjdGlvbnMgPT4ge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGFjdGlvbnMpKSBhY3Rpb25zID0gW107XG5cbiAgICAgIHRoaXMuc2hvd0NvbHMgPSBhY3Rpb25zLmxlbmd0aCA/IHRoaXMuY29sS2V5cy5jb25jYXQoJ19fYWN0aW9uc19fJykgOiB0aGlzLmNvbEtleXM7XG5cbiAgICAgIHJldHVybiBhY3Rpb25zO1xuICAgIH0pO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgIHRoaXMudGFibGVEYXRhU291cmNlLnNvcnQgPSB0aGlzLnNvcnQ7XG4gIH1cbiAgYXBwbHlGaWx0ZXIoZmlsdGVyVmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMudGFibGVEYXRhU291cmNlLmZpbHRlciA9IGZpbHRlclZhbHVlO1xuXG4gICAgaWYgKHRoaXMudGFibGVEYXRhU291cmNlLnBhZ2luYXRvcikge1xuICAgICAgdGhpcy50YWJsZURhdGFTb3VyY2UucGFnaW5hdG9yLmZpcnN0UGFnZSgpO1xuICAgIH1cbiAgfVxuXG4gIGFjdGlvbkNsaWNrKHJvd0RhdGE6IGFueSwgYWN0aW9uSW5kZXg6IG51bWJlcikge1xuXG4gICAgY29uc3QgY29udGV4dCA9IENvbnRleHQuY3JlYXRlKHRoaXMuY29udGV4dCwgeyAkZGF0YTogcm93RGF0YSB9KTtcblxuICAgIHRoaXMuYWRkU3Vic2NyaXB0aW9uID0gdGhpcy5fZXhwci5ldmFsKHRoaXMuYWN0aW9uc1thY3Rpb25JbmRleF0uYWN0aW9uLCBjb250ZXh0LCB0cnVlKS5zdWJzY3JpYmUoXG4gICAgICAoKSA9PiB7XG4gICAgICAgIC8vIFRPRE8gbG9naWMgdG8gcmVsb2FkIHRhYmxlXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG5cbn1cbiJdfQ==