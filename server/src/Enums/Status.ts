import { registerEnumType } from 'type-graphql';

export enum Status {
  scheduled = 'scheduled',
  openForRegistration = 'open for registration',
  groupPhase = 'group phase',
  eliminationPhase = 'elimination phase',
  done = 'done',
}

registerEnumType(Status, {
  name: 'Status',
});
