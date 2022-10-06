export interface Stock {
  symbol: string;
  description?: string;
  displaySymbol?: string;
  type?: string;
  c?: number;
  d?: number;
  dp?: number;
  h?: number;
  l?: number;
  o?: number;
  pc?: number;
  t?: number;
  data?: StockInsiderSentiment[];
}

export interface Stock {
  symbol: string;
  description?: string;
  displaySymbol?: string;
  type?: string;
  c?: number;
  d?: number;
  dp?: number;
  h?: number;
  l?: number;
  o?: number;
  pc?: number;
  t?: number;
}

export interface StocksForm {
  symbol: string;
}

export interface StockName {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
}

export interface StockCallName {
  count: number;
  result: StockName[];
}

export interface StockCallData {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
}

export interface StockInsiderSentiment {
  symbol: string;
  year: number;
  month: number;
  change: number;
  mspr: number;
  name?: string;
}

export interface StockCallInsiderSentiment {
  symbol: string;
  data: StockInsiderSentiment[];
}

export interface ForkJoinData {
  resultOne: StockCallName;
  resultTwo: StockCallData;
}

export interface ForkJoinDetails {
  resultOne: StockCallName;
  resultTwo: StockCallInsiderSentiment;
}
