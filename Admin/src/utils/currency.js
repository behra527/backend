// Currency formatter for Pakistani Rupees
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return 'Rs. 0';
  return `Rs. ${Number(amount).toLocaleString('en-PK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const formatCurrencyShort = (amount) => {
  if (amount === null || amount === undefined) return 'Rs. 0';
  return `Rs. ${Number(amount).toLocaleString('en-PK')}`;
};

