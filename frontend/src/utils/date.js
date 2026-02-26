export function formatDateTime(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString.replace(" ", "T"));

  return date
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", " at");
}