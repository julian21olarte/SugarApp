import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DatabaseService {

  constructor(public database: AngularFireDatabase) { }

  public get(item:string):any {
    return this.database.list(item).valueChanges();
  }

  public insert(item:string, data:object ) {
    console.log(data);
    return this.database.object( item ).set( data );
  }

}