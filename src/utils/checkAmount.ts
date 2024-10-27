export const getAmountWithSign = (amount: number) => {
  if (amount === 0) return '0';
  return amount > 0 ? `+ ${amount}` : `- ${Math.abs(amount)}`;
};

export const getAmountColor = (amount: number) => {
  if (amount >= 0) return 'text-primary';
  if (amount < 0) return 'text-red-500';
};
