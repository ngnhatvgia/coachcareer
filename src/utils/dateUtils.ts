export const parseDateString = (dateString: string): { day: number, month: number, year: number } | null => {
  if (!dateString) return null;
  const parts = dateString.split('-');
  if (parts.length !== 3) return null;
  
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;

  return { day, month, year };
};

export const isValidDate = (dateString: string): boolean => {
  const date = parseDateString(dateString);
  if (!date) return false;
  
  const { day, month, year } = date;
  
  // Basic check
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  if (year < 1900 || year > new Date().getFullYear()) return false;

  // Check days in month
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day > daysInMonth) return false;

  return true;
};

export const formatDateDisplay = (dateString: string): string => {
  const date = parseDateString(dateString);
  if (!date) return dateString;
  return `${date.day.toString().padStart(2, '0')}/${date.month.toString().padStart(2, '0')}/${date.year}`;
};
