export const dateToDateString = (date: Date): string => {
  // Get day, month, and year components from the date
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()

  // Create the date string in "DD-MM-YYYY" format
  const dateString = `${day}-${month}-${year}`
  return dateString
}

export const dateToTimeString = (date: Date): string => {
  // Get hours and minutes components from the date
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  // Create the time string in "HH:MM" format
  const timeString = `${hours}:${minutes}`
  return timeString
}

export const relativeDateFromToday = (futureDate: Date): string => {
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

  // Get the current date and time
  const today = new Date();

  // Calculate the difference in days between today and the future date
  const timeDifference = futureDate.getTime() - today.getTime();
  const daysDifference = Math.ceil(timeDifference / oneDayInMilliseconds);

  // Format the output based on the difference in days
  if (daysDifference === 0) {
    return "today";
  } else if (daysDifference === 1) {
    return "tomorrow";
  } else if (daysDifference > 1) {
    return `in ${daysDifference} days`;
  } else {
    return "date is in the past";
  }
}
