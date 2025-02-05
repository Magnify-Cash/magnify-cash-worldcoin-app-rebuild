// Utility function to calculate the remaining time (days, hours, minutes) and due date
export function calculateRemainingTime(
  startTime: bigint,
  loanPeriod: bigint,
): [number, number, number, Date] {
  // Get the current time as a BigInt in seconds
  const currentTimeInSeconds = BigInt(Math.floor(Date.now() / 1000));

  // Calculate the end time of the loan in seconds
  const endTimeInSeconds = startTime + loanPeriod;

  // Calculate the remaining time in seconds
  const remainingTimeInSeconds = endTimeInSeconds - currentTimeInSeconds;

  // If the remaining time is less than or equal to zero, the loan is overdue
  if (remainingTimeInSeconds <= 0n) {
    return [0, 0, 0, new Date(Number(startTime + loanPeriod) * 1000)]; // No remaining time, but return due date
  }

  // Convert the remaining time into days, hours, and minutes
  const daysRemaining = Number(remainingTimeInSeconds / 86400n); // 86400 seconds = 1 day
  const hoursRemaining = Number((remainingTimeInSeconds % 86400n) / 3600n); // 3600 seconds = 1 hour
  const minutesRemaining = Number((remainingTimeInSeconds % 3600n) / 60n); // 60 seconds = 1 minute

  // Calculate due date
  const dueDate = new Date(Number(startTime + loanPeriod) * 1000);

  return [daysRemaining, hoursRemaining, minutesRemaining, dueDate];
}
