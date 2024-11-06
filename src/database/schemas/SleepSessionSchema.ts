import Realm from 'realm';

export interface ISleepSession {
  id: string;
  startDate: Date;
  endDate: Date;
  dataSource: string;
  totalSleepTime: number;
  createdAt: Date;
  updatedAt: Date;
  isSynced: boolean;
}

export class SleepSession extends Realm.Object {
  id!: string;
  startDate!: Date;
  endDate!: Date;
  dataSource!: string;
  totalSleepTime!: number;
  createdAt!: Date;
  updatedAt!: Date;

  static schema: Realm.ObjectSchema = {
    name: 'SleepSession',
    primaryKey: 'id',
    properties: {
      id: 'string',
      startDate: 'date',
      endDate: 'date',
      dataSource: 'string',
      totalSleepTime: 'int',
      createdAt: 'date',
      updatedAt: 'date',
      isSynced: {type: 'bool', default: false},
    },
  };
}
