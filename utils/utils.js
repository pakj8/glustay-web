export const dateFormatter = (d) => {
  try {
    const date = new Date(d);
    const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
      date.getDay()
    ];
    const b = date?.getDate();
    const year = date?.getFullYear();

    return `${dayName}, ${b} ${year}`;
  } catch (error) {
    console.error(error);
  }
};

export const timeFormatter = (d) => {
  try {
    // Create a new Date object from the provided parameter
    const date = new Date(d);

    // Extract the hours and minutes
    let hours = date.getHours();
    const minutes = date.getMinutes();

    // Determine AM/PM
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12 || 12; // If hours is 0, set it to 12

    // Format minutes to always have two digits
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Return the formatted time string
    return `${hours}:${formattedMinutes} ${ampm}`;
  } catch (error) {
    console.error("Error formatting time:", error);
    return "";
  }
};
