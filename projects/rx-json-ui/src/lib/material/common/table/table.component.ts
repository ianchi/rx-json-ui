/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import { BreakpointObserver } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { BaseWidget, CommonEventsDef, Expressions } from '../../../core/index';

export interface BaseTableWidgetOptions {
  /** Order list of column keys (each maps to a property of the row element). */
  columns: string[];

  /** Optional order list of column keys to use on small screen */
  columns_sm: string[];
  /**
   * Map of column keys to headers display names.
   * If a map is present and a column key is omitted that key is used as header.
   * If `undefined` no header row is displayed.
   */
  headers: { [column: string]: string };
  /** If set, the table has paging footer, with multiple options of page sizes */
  pageSizes: number[];

  /**
   * Format to apply to each column's data for rendering
   * It must be a valid *Angular* format pipe string
   */
  colFormat: string[];

  actions: Array<{
    /** SVG icon name to show */
    icon?: string;
    /** Label for the action */
    label?: string;
    /** Optional data to pass to the `onAction` event when this action is clicked */
    data?: any;
  }>;
  /** Label to show on the actions column */
  actionsHeader: string;

  /**
   * Column name or function to use to check the differences in data changes.
   * Optimize row operations by identifying a row based on its data relative
   * to the function to know if a row should be added/removed/moved.
   * Accepts a function that takes two parameters, `index` and `item`.
   */
  trackBy: string;
}
export interface TableWidgetOptions extends BaseTableWidgetOptions {
  /**  Label to show on the control (fixed text) */
  title: string;
  /** Table's data. Each element's key maps to a column */
  dataSource: object[];
  /**
   * Adds a textbox to filter by the content of any column
   */
  filter: boolean;
  /**
   * Disable sorting for the listed columns (provided as array of keys)
   * If not set or false, all columns allow sorting.
   * If `true`, sorting is disabled for all columns.
   */
  disableSort: string[] | boolean;
}

interface TableWidgetEvents extends CommonEventsDef {
  /**
   * Expression to evaluate when an action is clicked.
   * It receives the following parameters in the context:
   *
   * `$row` the row's data
   * `$action.index` the index of the current action in the actions array
   * `$action.data` the additional data defined in the action
   */
  onAction: string;
}

@Component({
  selector: 'wdg-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableWidgetComponent
  extends BaseWidget<TableWidgetOptions, undefined, TableWidgetEvents>
  implements OnInit {
  tableDataSource: MatTableDataSource<object[]> = new MatTableDataSource();

  showCols: string[] = [];

  @ViewChild(MatPaginator, { static: true })
  matPaginator: MatPaginator | undefined;
  @ViewChild(MatSort, { static: true })
  matSort: MatSort | undefined;
  disableSort: string[] | undefined;

  trackBy: ((index: number, item: any) => any) | undefined;

  isMediaSmall = false;

  constructor(cdr: ChangeDetectorRef, expr: Expressions, public media: BreakpointObserver) {
    super(cdr, expr);

    this.addSubscription = media.observe('(max-width: 599px)').subscribe(isMatched => {
      this.isMediaSmall = isMatched.matches;
      this.setColumns();
      cdr.markForCheck();
    });
  }
  dynOnBeforeBind(): void {
    this.map(
      'disableSort',
      sort => (this.disableSort = sort === true ? undefined : !Array.isArray(sort) ? [] : sort)
    );

    this.map('dataSource', (table: any[]) => (this.tableDataSource.data = table));

    this.map(
      'trackBy',
      (func: any) =>
        (this.trackBy =
          typeof func === 'string' || typeof func === 'number'
            ? (_index, item) => item[func]
            : typeof func === 'function'
            ? func
            : undefined)
    );

    this.map('columns', cols => (Array.isArray(cols) ? cols : []));
    this.map('pageSizes', value => {
      if (!Array.isArray(value) || !value.length) {
        this.tableDataSource.paginator = null;
        return null;
      }
      this.tableDataSource.paginator = this.matPaginator || null;
      return value;
    });

    this.map('actions', actions => {
      if (!Array.isArray(actions)) actions = [];

      this.setColumns();
      return actions;
    });
  }

  dynOnAfterBind(): void {
    super.dynOnAfterBind();
    this.map('columns', () => this.setColumns());
    this.map('columns_sm', () => this.setColumns());
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.tableDataSource.sort = this.matSort || null;
  }
  applyFilter(filterValue: string): void {
    this.tableDataSource.filter = filterValue;
    if (this.tableDataSource.paginator) {
      this.tableDataSource.paginator.firstPage();
    }
  }

  setColumns(): void {
    const keys = (this.isMediaSmall && this.options.columns_sm) || this.options.columns;
    this.showCols = this.options.actions?.length ? keys.concat('__actions__') : keys;
  }
  actionClick(rowData: any, actionIndex: number): void {
    this.emmit('onAction', {
      $row: rowData,
      $action: { data: this.options.actions[actionIndex].data, index: actionIndex },
    });
  }
}
