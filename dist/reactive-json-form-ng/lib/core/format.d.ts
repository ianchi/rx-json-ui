import { PipeTransform } from '@angular/core';
/** Angular Pipe to format text */
export declare class FormatPipe implements PipeTransform {
    transform(value: any, format: any): any;
}
export declare function formatValue(value: any, format: string): any;
