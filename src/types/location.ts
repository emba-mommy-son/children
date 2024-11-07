export interface Location {
  locationId?: number;
  boundaryId: number;
  name: string;
  latitude: number;
  longitude: number;
  danger: boolean;
}

export interface Boundary {
  boundaryId: number;
  name: string;
  latitude: number;
  longitude: number;
  danger: boolean;
  radius: number;
  cratedAt: Date;
}
