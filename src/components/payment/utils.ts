export function clearNumber(value = "") {
  return value.replace(/\D+/g, "");
}

export function formatCreditCardNumber(value: string) {
  if (!value) {
    return value;
  }

  const clearValue = clearNumber(value);
  const nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
    4,
    8,
  )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`;
  return nextValue.trim();
}

export function formatExpirationDate(value: string) {
  const clearValue = clearNumber(value);

  if (clearValue.length >= 3) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
  }

  return clearValue;
}

/*
export function formatFormData(data) {
  return Object.keys(data).map((d) => `${d}: ${data[d]}`);
}
*/
