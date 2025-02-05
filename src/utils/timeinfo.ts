export function calculateRemainingTime(
  startTime: bigint,
  loanPeriod: bigint,
): [number, number, number, Date] {
  // Get the current time in milliseconds as a BigInt
  const currentTimeInMilliseconds = BigInt(Date.now());

  // Calculate the end time of the loan in milliseconds
  const endTimeInMilliseconds = (startTime + loanPeriod) * 1000n;

  // Calculate the remaining time in milliseconds
  let remainingTimeInMilliseconds = endTimeInMilliseconds - currentTimeInMilliseconds;

  if (remainingTimeInMilliseconds <= 0n) {
    // If the loan is overdue, return zero for all time components with the due date
    return [0, 0, 0, new Date(Number(endTimeInMilliseconds) / 1000)];
  }

  // Convert milliseconds to days, hours, and minutes
  const millisecondsPerDay = 86400000n; // 1000 * 60 * 60 * 24
  const millisecondsPerHour = 3600000n; // 1000 * 60 * 60
  const millisecondsPerMinute = 60000n; // 1000 * 60

  const daysRemaining = Number(remainingTimeInMilliseconds / millisecondsPerDay);
  remainingTimeInMilliseconds %= millisecondsPerDay;
  const hoursRemaining = Number(remainingTimeInMilliseconds / millisecondsPerHour);
  remainingTimeInMilliseconds %= millisecondsPerHour;
  const minutesRemaining = Number(remainingTimeInMilliseconds / millisecondsPerMinute);

  // Calculate due date
  const dueDate = new Date(Number(endTimeInMilliseconds) / 1000);

  return [daysRemaining, hoursRemaining, minutesRemaining, dueDate];
}
