import { matches } from './data/matches';
import { IMatchesParsed } from './common/Match.interface';
import { EventName } from './EventName';
import { MatchScore } from './MatchScore';

const matchesParsed: IMatchesParsed[] = [];
const eventName = new EventName();
const matchScore = new MatchScore();

try {
  matches.forEach((match) => {
    const name = eventName.makeEventName(match);
    const score = matchScore.formatScore(match);
    matchesParsed.push({
      name,
      score,
    });
  });
} catch (e) {
  console.error(e);
}

console.log(matchesParsed);
