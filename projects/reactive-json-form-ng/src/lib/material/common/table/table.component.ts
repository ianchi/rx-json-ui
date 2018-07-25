/**
 * Copyright (c) 2018 Adrian Panella <ianchi74@outlook.com>
 *
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

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
import { combineMixed } from 'espression';
import { isObservable, Observable } from 'rxjs';

import { AbstractWidget, Context, Expressions, parseDefObject } from '../../../core/index';

@Component({
  selector: 'wdg-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableWidgetComponent extends AbstractWidget implements OnInit {
  title: string;
  dataSource: Observable<any[]> | any[];
  tableDataSource: MatTableDataSource<{ [prop: string]: any }>;

  colKeys: string[];
  colHeaders: string[];
  colsVisible: string[];
  pageSizes: number[];
  filterBy: string[];
  disableSort: string[] = [];

  colTransform: string[];
  colFormat: string[];

  actions: Array<{ icon: string; label: string; action: string }> = [];
  actionsHeader: string;
  showCols: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
    this.tableDataSource = new MatTableDataSource();
  }

  dynOnBeforeBind(): void {
    const opt = this.widgetDef.options;

    // if the only source is a static array, lets check if it has 'property=' columns to evaluate
    // and add the auto binding
    if (opt && !opt['dataSource='] && Array.isArray(opt.dataSource)) {
      const dataSource = <Observable<any[]>>(
        combineMixed(
          opt.dataSource.map(
            row => combineMixed(parseDefObject(row, this.context, false, this._expr)),
            false
          ),
          false
        )
      );
      if (isObservable(dataSource)) this.bindings.dataSource = dataSource;
      else this.dataSource = dataSource;
    }

    this.map('disableSort', sort => {
      if (sort === true) return null;
      if (!Array.isArray(sort)) return [];
      return sort;
    });

    this.map(
      'dataSource',
      (table: any[]) =>
        (this.tableDataSource.data = table.map(row => {
          row = parseDefObject(
            row,
            Context.create(this.context, { $data: row }),
            false,
            this._expr
          );

          if (Array.isArray(this.colTransform)) {
            for (let i = 0; i < this.colTransform.length; i++) {
              if (this.colTransform[i]) {
                const context: any = Context.create(this.context);
                context.$data = row[this.colKeys[i]];
                row[this.colKeys[i]] = this._expr.eval(this.colTransform[i], context, false);
              }
            }
          }

          return row;
        }))
    );

    this.map('pageSizes', value => {
      if (!Array.isArray(value) || !value.length) {
        this.tableDataSource.paginator = null;
        return null;
      }
      this.tableDataSource.paginator = this.paginator;
      return value;
    });

    this.map('colKeys', keys => {
      this.showCols = this.actions && this.actions.length ? keys.concat('__actions__') : keys;
      return keys;
    });
    this.map('actions', actions => {
      if (!Array.isArray(actions)) actions = [];

      this.showCols = actions.length ? this.colKeys.concat('__actions__') : this.colKeys;

      return actions;
    });
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.tableDataSource.sort = this.sort;
  }
  applyFilter(filterValue: string): void {
    this.tableDataSource.filter = filterValue;

    if (this.tableDataSource.paginator) {
      this.tableDataSource.paginator.firstPage();
    }
  }

  actionClick(rowData: any, actionIndex: number): void {
    const context = Context.create(this.context, { $data: rowData });

    this.addSubscription = this._expr
      .eval(this.actions[actionIndex].action, context, true)
      .subscribe(() => {
        // TODO logic to reload table
      });
  }
}
