import Realm from 'realm';

export interface IMessage {
  id: Realm.BSON.ObjectId;
  platform: string;
  sender: string;
  group: string;
  content: string;
  createdAt: Date;
}

interface MessageCreateProps {
  platform: string;
  sender: string;
  group: string;
  content: string;
  createdAt: Date;
}

export class Message extends Realm.Object {
  id!: Realm.BSON.ObjectId;
  platform!: string;
  sender!: string;
  group!: string;
  content!: string;
  createdAt!: Date;

  static create(props: MessageCreateProps): IMessage {
    const {platform, sender, group, content, createdAt} = props;

    return {
      id: new Realm.BSON.ObjectId(),
      platform,
      sender,
      group,
      content,
      createdAt,
    };
  }
  static schema: Realm.ObjectSchema = {
    name: 'Message',
    primaryKey: 'id',
    properties: {
      id: 'objectId',
      platform: 'string',
      sender: 'string',
      group: 'string',
      content: 'string',
      createdAt: 'date',
    },
  };
}
