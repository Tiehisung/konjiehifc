export const getYears = (
  from = 2020,
  to = new Date().getFullYear(),
  asc = false
) => {
  const years = [];
  while (from <= to) {
    years.push(from);
    from = from + 1;
  }
  return asc ? years : years.sort((a, b) => b - a);
};
