export const getDeviceIcon = (deviceType: string) => {
  switch (deviceType) {
    case "mobile":
      return "ri-smartphone-line";
    case "tablet":
      return "ri-tablet-line";
    case "desktop":
    default:
      return "ri-macbook-line";
  }
};

export const formatSessionDate = (isoString: string) => {
  const date = new Date(isoString);

  // Opciones para obtener "Month day at hour:minuteAM/PM"
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  // Intl.DateTimeFormat genera algo como "October 30, 2:06 PM"
  const formatted = new Intl.DateTimeFormat("en-US", options).format(date);

  // Para quitar la coma entre día y hora y dejarlo como "October 30 at 2:06 PM"
  return formatted.replace(",", " at");
};
