export interface MoneyStrategy {
  calculate(amount: number): number;
}
