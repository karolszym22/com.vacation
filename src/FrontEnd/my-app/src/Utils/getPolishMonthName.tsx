export const getPolishMonthName = (englishMonthName: string): string => {
  const monthNames: { [key: string]: string } = {
    January: "Styczeń",
    February: "Luty",
    March: "Marzec",
    April: "Kwiecień",
    May: "Maj",
    June: "Czerwiec",
    July: "Lipiec",
    August: "Sierpień",
    September: "Wrzesień",
    October: "Październik",
    November: "Listopad",
    December: "Grudzień",
  };

  return monthNames[englishMonthName] || englishMonthName;
};
