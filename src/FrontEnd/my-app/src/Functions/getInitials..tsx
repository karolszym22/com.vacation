export const getInitials = (name: string): string => {
  const words = name.split(" ").filter((word) => word.length > 0);

  if (words.length === 0) {
    return "";
  }

  const initials = words.map((word) => word[0].toUpperCase()).join("");

  return initials;
};
