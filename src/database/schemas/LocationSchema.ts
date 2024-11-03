import Realm from 'realm';
import {v4 as uuid} from 'uuid';

export interface ILocation {
  id: string;
  altitude: number;
  latitude: number;
  longitude: number;
  accuracy: number;
  speed: number;
  provider: string;
  createdAt: Date;
  danger: boolean;
  isSent: boolean;
}

interface LocationCreateProps {
  altitude: number;
  latitude: number;
  longitude: number;
  accuracy: number;
  speed: number;
  provider: string;
  danger: boolean;
  isSent: boolean;
}

export class Location extends Realm.Object {
  id!: string;
  altitude!: number;
  latitude!: number;
  longitude!: number;
  accuracy!: number;
  speed!: number;
  provider!: string;
  createdAt!: Date;
  danger!: boolean;
  isSent!: boolean;

  static create(props: LocationCreateProps): ILocation {
    const {
      altitude,
      latitude,
      longitude,
      accuracy,
      speed,
      provider,
      danger,
      isSent,
    } = props;

    return {
      id: uuid(),
      altitude,
      latitude,
      longitude,
      accuracy,
      speed,
      provider,
      createdAt: new Date(),
      danger,
      isSent,
    };
  }

  public static schema: Realm.ObjectSchema = {
    name: 'Location',
    primaryKey: 'id',
    properties: {
      id: 'string',
      altitude: 'float',
      latitude: 'float',
      longitude: 'float',
      accuracy: 'float',
      speed: 'float',
      provider: 'string',
      createdAt: 'date',
      danger: 'bool',
      isSent: 'bool',
    },
  };
}
