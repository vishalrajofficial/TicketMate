import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@giats-tickets/common';

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
