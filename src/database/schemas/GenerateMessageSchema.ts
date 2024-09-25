import {create} from 'zustand';
import {Realm} from 'realm';

export interface IGenerateMessage {
  id: Realm.BSON.ObjectId;
  input: string;
  output: string;
  createdAt: Date;
}

export interface IGenerateMessageCreateProps {
  input: string;
  output: string;
}

export class GenerateMessage extends Realm.Object {
  id!: Realm.BSON.ObjectId;
  input!: string;
  output!: string;
  createdAt!: Date;

  static create = (props: IGenerateMessageCreateProps): IGenerateMessage => {
    const {input, output} = props;

    return {
      id: new Realm.BSON.ObjectId(),
      input,
      output,
      createdAt: new Date(),
    };
  };

  public static schema: Realm.ObjectSchema = {
    name: 'GenerateMessage',
    primaryKey: 'id',
    properties: {
      id: 'objectId',
      input: 'string',
      output: 'string',
      createdAt: 'date',
    },
  };
}
