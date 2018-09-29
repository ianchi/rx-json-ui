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
import { combineMixed } from 'espression-rx';
import { isObservable } from 'rxjs';

import { AbstractWidget, Context, Expressions, IDictionary, parseDefObject } from '../../../core';

export interface ITableWidgetOptions {
  title: string;
  dataSource: object[];
  colKeys: string[];
  colHeaders: string[];
  colsVisible: string[];
  pageSizes: number[];
  filterBy: string[];
  disableSort: string[];

  colTransform: string[];
  colFormat: string[];

  actions: Array<{ icon: string; label: string; action: string }>;
  actionsHeader: string;
}
@Component({
  selector: 'wdg-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableWidgetComponent extends AbstractWidget<ITableWidgetOptions> implements OnInit {
  tableDataSource: MatTableDataSource<IDictionary>;

  showCols: string[] = [];

  @ViewChild(MatPaginator)
  paginator: MatPaginator | undefined;
  @ViewChild(MatSort)
  sort: MatSort | undefined;

  constructor(cdr: ChangeDetectorRef, expr: Expressions) {
    super(cdr, expr);
    this.tableDataSource = new MatTableDataSource();
  }

  dynOnBeforeBind(): void {
    const opt = this.widgetDef!.options;

    // if the only source is a static array, lets check if it has 'property=' columns to evaluate
    // and add the auto binding
    if (opt && !opt['dataSource='] && Array.isArray(opt.dataSource)) {
      const dataSource = combineMixed(
        opt.dataSource.map(
          row => combineMixed(parseDefObject(row, this.context, false, this._expr)),
          false
        ),
        false
      );
      if (isObservable<object[]>(dataSource)) this.bindings.dataSource = dataSource;
      else this.options.dataSource = <any[]>dataSource;
    }

    this.map('disableSort', sort => {
      if (sort === true) return undefined;
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

          if (Array.isArray(this.options.colTransform)) {
            for (let i = 0; i < this.options.colTransform.length; i++) {
              if (this.options.colTransform[i]) {
                const context: any = Context.create(this.context);
                context.$data = row[this.options.colKeys[i]];
                row[this.options.colKeys[i]] = this._expr.eval(
                  this.options.colTransform[i],
                  context,
                  false
                );
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
      this.tableDataSource.paginator = this.paginator || null;
      return value;
    });

    this.map('colKeys', keys => {
      this.showCols =
        this.options.actions && this.options.actions.length ? keys.concat('__actions__') : keys;
      return keys;
    });
    this.map('actions', actions => {
      if (!Array.isArray(actions)) actions = [];

      this.showCols = actions.length
        ? this.options.colKeys.concat('__actions__')
        : this.options.colKeys;

      return actions;
    });
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.tableDataSource.sort = this.sort || null;
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
      .eval(this.options.actions[actionIndex].action, context, true)
      .subscribe(() => {
        // TODO logic to reload table
      });
  }
}
