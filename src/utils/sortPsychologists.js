const sortPsychologists = (items, sortBy) => {
  switch (sortBy) {
    case "a-z":
      return [...items].sort((a, b) => a.name.localeCompare(b.name));
    case "z-a":
      return [...items].sort((a, b) => b.name.localeCompare(a.name));
    case "low-high":
      return [...items].sort((a, b) => a.price_per_hour - b.price_per_hour);
    case "high-low":
      return [...items].sort((a, b) => b.price_per_hour - a.price_per_hour);
    case "popular-high-low":
      return [...items].sort((a, b) => b.rating - a.rating);
    case "popular-low-high":
      return [...items].sort((a, b) => a.rating - b.rating);
    case "all":
    default:
      return items;
  }
};

export default sortPsychologists;
