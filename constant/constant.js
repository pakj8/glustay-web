export function formatDate(d) {
  if (new Date(d)) {
    const date = new Date(d);
    const month = date?.getMonth();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "April",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthNameWithNumber = monthNames[month];
    const day = date?.getDate();
    const year = date?.getFullYear();

    return `${monthNameWithNumber} ${day}, ${year}`;
  } else {
    console.log("Invalid date");
  }
}
