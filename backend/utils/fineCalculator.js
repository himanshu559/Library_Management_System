export const calculateFine = (dueDate) => {
  const finePerHour = 0.1; // 10 cents per hour
  const today = new Date(); // current date and time
  
  if(today > dueDate) {
    const lateHour = Math.ceil((today - dueDate) / (1000 * 60 * 60)); // convert milliseconds to hours
    const fine = lateHour * finePerHour; // calculate total fine
    return fine;
  } else {
    return 0;
  }



};
export default calculateFine;