import { SportName } from './common/SportName.enum';
import { IMatch } from './common/Match.interface';
import { ExceptionMessages } from './common/ExceptionMessages.enum';

export class EventName {
  makeEventName(match: IMatch): string {
    switch (match.sport) {
      case SportName.Soccer:
      case SportName.Volleyball:
      case SportName.Basketball:
        return `${match.participant1} - ${match.participant2}`;
      case SportName.Tennis:
      case SportName.Handball:
        return `${match.participant1} vs ${match.participant2}`;
      default:
        throw new Error(ExceptionMessages.InvalidSport);
    }
  }
}
