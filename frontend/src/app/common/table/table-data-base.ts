import { BehaviorSubject } from 'rxjs/BehaviorSubject';
/**
 * An example database that the data source uses to retrieve data for the table.
 */
export class TableDataBase<T> {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  get data(): T[] { return this.dataChange.value; }

  constructor(ds: T[]) {
    for(let data of ds) {
      this.addData(data);
    }
  }

  /**
   * Adds a new data to the database.
   */
  addData(data: T): void {
    const copiedData = this.data.slice();
    copiedData.push(data);
    this.dataChange.next(copiedData);
  }

  /**
   * Delete data form the database
   */
  deleteData(id: string): void {
    const copiedData = this.data.slice();
    copiedData.forEach(function (value, index) {
      if(JSON.parse(JSON.stringify(value)).id === id) {
        copiedData.splice(index, 1)
      }
    });
    this.dataChange.next(copiedData);
  }

}