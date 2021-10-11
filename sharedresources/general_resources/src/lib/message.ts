import { MessageTypes, ServiceTypeTypes, TopicTypes } from '..';

export class Message {
  sender: ServiceTypeTypes;
  event: MessageTypes;
  topic: TopicTypes;
  body: string;
}
