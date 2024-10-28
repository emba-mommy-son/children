import Realm from 'realm';
import {Location} from './LocationSchema';
import {Message} from './MessageSchema';
import {RefineMessage} from './RefineMessageSchema';
import {SleepSession} from './SleepSessionSchema';
export const realm = new Realm({
  schema: [Message, RefineMessage, Location, SleepSession],
});
