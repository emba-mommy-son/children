import Realm from 'realm';

export interface ILocation {
  id: number;
  deviceId: string;
  UUID: string;
  timeStamp: Date;
  createdAt: Date;
  latitude: number;
  longitude: number;
  accuracty: number;
  activity: string;
  battery: number;
}

export class Location extends Realm.Object {
  id!: number;
  deviceId!: string;

  public static schema: Realm.ObjectSchema = {
    name: 'Location',
    primaryKey: 'id',
    properties: {
      id: 'int',
      deviceId: 'string',
      UUID: 'string',
      timeStamp: 'date',
      createdAt: 'date',
      latitude: 'double',
      longitude: 'double',
      accuracty: 'int',
      activity: 'string',
      battery: 'int',
    },
  };
}
