import { Vacation } from "../Types/Vacation";

export const countDuringVacations = (
  vacations: Vacation[],
  personId: number
): number => {
  return vacations.filter(
    (vacation) =>
      vacation.personId === personId && vacation.taskStatus !== "Zrealizowano" && vacation.taskStatus !== "Odrzucono"
  ).length;
};
