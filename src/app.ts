import { matches } from './data/matches';

type Match = {
  sport: string;
  participant1?: string;
  participant2?: string;
  score?: string | string[][];
};

type MatchesParsed = {
  name: string;
  score: string;
};

enum MatchSport {
  Soccer = 'soccer',
  Volleyball = 'volleyball',
  Basketball = 'basketball',
  Tennis = 'tennis',
  Handball = 'handball',
}

const exception = 'Exception: invalid sport';

class EventParser {
  makeEventName(match: Match): string {
    if (
      match.sport === MatchSport.Soccer ||
      match.sport === MatchSport.Volleyball ||
      match.sport === MatchSport.Basketball
    ) {
      return `${match.participant1} - ${match.participant2}`;
    } else if (
      match.sport === MatchSport.Tennis ||
      match.sport === MatchSport.Handball
    ) {
      return `${match.participant1} vs ${match.participant2}`;
    } else {
      return exception;
    }
  }

  formatScore(match: Match): string {
    if (
      (match.sport === MatchSport.Soccer ||
        match.sport === MatchSport.Handball) &&
      typeof match.score === 'string'
    ) {
      return match.score;
    } else if (
      (match.sport === MatchSport.Tennis ||
        match.sport === MatchSport.Volleyball) &&
      typeof match.score === 'string'
    ) {
      const scores =
        /([0-9]+:[0-9]+),([0-9]+:[0-9]+),([0-9]+:[0-9]+),([0-9]+:[0-9]+)/.exec(
          match.score
        );

      const set1 = scores?.[2]?.replace(/:/g, ':');
      const set2 = scores?.[3]?.replace(/:/g, ':');
      const set3 = scores?.[4]?.replace(/:/g, ':');

      return `Main score: ${scores?.[1]} (set1 ${set1}, set2 ${set2}, set3 ${set3})`;
    } else if (
      match.sport === MatchSport.Basketball &&
      Array.isArray(match.score)
    ) {
      return match.score.map((v: string[]) => v.join(',')).join(',');
    } else {
      return exception;
    }
  }
}

const matchesParsed: MatchesParsed[] = [];

for (let i = 0; i < matches.length; i++) {
  const parser = new EventParser();
  const name = parser.makeEventName(matches[i]);
  const score = parser.formatScore(matches[i]);

  if (name !== exception && score !== exception) {
    matchesParsed.push({
      name,
      score,
    });
  }
}

console.log(matchesParsed);
