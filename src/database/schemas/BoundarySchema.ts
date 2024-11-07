import Realm from 'realm';

export interface IBoundary {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  danger: boolean;
  radius: number;
}

interface BoundaryCreateProps {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  danger: boolean;
  radius: number;
}

export class Boundary extends Realm.Object {
  id!: number;
  name!: string;
  latitude!: number;
  longitude!: number;
  danger!: boolean;
  radius!: number;

  static create(props: BoundaryCreateProps): IBoundary {
    const {id, name, latitude, longitude, danger, radius} = props;

    return {
      id,
      name,
      latitude,
      longitude,
      danger,
      radius,
    };
  }

  public static schema: Realm.ObjectSchema = {
    name: 'Boundary',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
      latitude: 'double',
      longitude: 'double',
      danger: 'bool',
      radius: 'int',
    },
  };
}
