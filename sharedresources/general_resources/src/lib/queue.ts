import { MessageTypes, ServiceTypeTypes, TopicTypes } from '..';

export interface Queue {
  fromService: ServiceTypeTypes;
  topic: TopicTypes;
  mesageType: MessageTypes;
  message: any;
}
