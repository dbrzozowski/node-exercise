import { IMatch } from './common/Match.interface';
import { SportName } from './common/SportName.enum';
import { ExceptionMessages } from './common/ExceptionMessages.enum';

export class MatchScore {
  formatScore(match: IMatch): string {
    if ((match.sport === SportName.Soccer || match.sport === SportName.Handball) && typeof match.score === 'string') {
      return match.score;
    } else if ((match.sport === SportName.Tennis || match.sport === SportName.Volleyball) && typeof match.score === 'string') {
      const scores = /([0-9]+:[0-9]+),([0-9]+:[0-9]+),([0-9]+:[0-9]+),([0-9]+:[0-9]+)/.exec(match.score);
      const set1 = scores?.[2];
      const set2 = scores?.[3];
      const set3 = scores?.[4];
      return `Main score: ${scores?.[1]} (set1 ${set1}, set2 ${set2}, set3 ${set3})`;
    } else if (match.sport === SportName.Basketball && Array.isArray(match.score)) {
      return match.score.map((v: string[]) => v.join(',')).join(',');
    } else {
      throw new Error(ExceptionMessages.InvalidSport);
    }
  }
}
