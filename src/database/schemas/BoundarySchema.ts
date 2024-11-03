import Realm from 'realm';

export interface IBoundary {
  id: number;
  latitude: number;
  longitude: number;
  danger: boolean;
  radius: number;
  createdAt: Date;
}

interface BoundaryCreateProps {
  id: number;
  latitude: number;
  longitude: number;
  danger: boolean;
  radius: number;
}

export class Boundary extends Realm.Object {
  id!: number;
  latitude!: number;
  longitude!: number;
  danger!: boolean;
  radius!: number;
  createdAt!: Date;

  static create(props: BoundaryCreateProps): IBoundary {
    const {id, latitude, longitude, danger, radius} = props;

    return {
      id,
      latitude,
      longitude,
      danger,
      radius,
      createdAt: new Date(),
    };
  }

  public static schema: Realm.ObjectSchema = {
    name: 'Boundary',
    primaryKey: 'id',
    properties: {
      id: 'int',
      latitude: 'float',
      longitude: 'float',
      danger: 'bool',
      radius: 'int',
      createdAt: 'date',
    },
  };
}
