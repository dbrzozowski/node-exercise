export interface IMatch {
  sport: string;
  participant1?: string;
  participant2?: string;
  score?: string | string[][];
}

export interface IMatchesParsed {
  name: string;
  score: string;
}
