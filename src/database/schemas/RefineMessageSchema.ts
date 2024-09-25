import Realm from 'realm';

export interface IRefineMessage {
  id: Realm.BSON.ObjectId;
  platform: string;
  sender: string;
  group: string;
  content: string;
  isAnalyzed: boolean;
  createdAt: Date;
}

interface RefineMessageCreateProps {
  platform: string;
  sender: string;
  group: string;
  content: string;
  createdAt: Date;
}

export class RefineMessage extends Realm.Object {
  id!: Realm.BSON.ObjectId;
  platform!: string;
  sender!: string;
  group!: string;
  content!: string;
  isAnalyzed!: boolean;
  createdAt!: Date;

  static create(props: RefineMessageCreateProps): IRefineMessage {
    const {platform, sender, group, content, createdAt} = props;

    return {
      id: new Realm.BSON.ObjectId(),
      platform,
      sender,
      group,
      content,
      isAnalyzed: false,
      createdAt,
    };
  }

  public static schema: Realm.ObjectSchema = {
    name: 'RefineMessage',
    primaryKey: 'id',
    properties: {
      id: 'objectId',
      platform: 'string',
      sender: 'string',
      group: 'string',
      content: 'string',
      isAnalyzed: 'bool',
      createdAt: 'date',
    },
  };
}
