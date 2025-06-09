const sortPsychologists = (items, sortBy) => {
  switch (sortBy) {
    case "a-z":
      return [...items].sort((a, b) => a.name.localeCompare(b.name));
    case "z-a":
      return [...items].sort((a, b) => b.name.localeCompare(a.name));
    case "lt-10":
      return items.filter((p) => p.price_per_hour < 10);
    case "gt-10":
      return items.filter((p) => p.price_per_hour >= 10);
    case "popular":
      return items.filter((p) => p.rating >= 4);
    case "not-popular":
      return items.filter((p) => p.rating < 4);
    case "all":
    default:
      return items;
  }
};

export default sortPsychologists;
