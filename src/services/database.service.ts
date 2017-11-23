import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DatabaseService {

  constructor(public database: AngularFireDatabase) { }

  public get(item:string) {
    return this.database.list(item).valueChanges();
  }


  public insert(item:string, data:any ) {
    console.log(data);
    let key = this.database.list( item ).push({}).key;
    data.id = key;
    return this.database.object(item + '/' + key).set(data);
  }


  public update(itemWithId:string, data:object ) {
    console.log(data);
    return this.database.object( itemWithId ).update( data );
  }


  public delete(itemWithId: string) {
    return this.database.object( itemWithId ).remove();
  }

  public getPhases() {
    return this.database.list('phases').valueChanges();
  }

}