export const bigIntReplacer = (key: string, value: unknown): unknown => {
  if (typeof value === 'bigint') {
    return value.toString();
  }
  if (Array.isArray(value)) {
    return value.map(item => bigIntReplacer('', item));
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, bigIntReplacer(k, v)])
    );
  }
  return value;
};

export const convertBalanceToDecimal = (balance: bigint, decimals: number): string => {
  if (balance === 0n) return '0';
  const divisor = 10n ** BigInt(decimals);
  const beforeDecimal = balance / divisor;
  const afterDecimal = balance % divisor;
  return `${beforeDecimal}${afterDecimal ? `.${afterDecimal}` : ''}`;
}; 