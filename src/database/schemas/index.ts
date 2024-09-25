import Realm from 'realm';
import {Location} from './LocationSchema';
import {Message} from './MessageSchema';
import {RefineMessage} from './RefineMessageSchema';

const realm = new Realm({
  schema: [Message, RefineMessage, Location],
});

export default realm;
