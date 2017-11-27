import { Pipe, PipeTransform, Injectable } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'orderBy'
})

@Injectable()
export class orderByPipe implements PipeTransform {
  transform(list: Array<any>, valueOrder:string, order:string): any {
    return _.orderBy(list, valueOrder, order);
  }
}