import Realm from 'realm';
import {Location} from './LocationSchema';
import {Message} from './MessageSchema';
import {RefineMessage} from './RefineMessageSchema';

export const realm = new Realm({
  schema: [Message, RefineMessage, Location],
});
