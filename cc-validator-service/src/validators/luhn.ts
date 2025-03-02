function luhn(cardNumber: string) {
  const reverseCardNumber = [...cardNumber].reverse().map(c => parseInt(c));
  let sum = 0;
  for (const [index, val] of reverseCardNumber.entries()) {
    if (index % 2 === 0) {
      sum += val;
      continue;
    }

    const left = Math.floor(2 * val / 10);
    const right = 2 * val % 10;
    sum += left + right;
  }

  return sum % 10 === 0;
}

export default luhn;