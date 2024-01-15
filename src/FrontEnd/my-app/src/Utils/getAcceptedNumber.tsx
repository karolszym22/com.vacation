import { Vacation } from "../Types/Vacations/Vacation";

export const countAcceptedVacations = (
  vacations: Vacation[],
  personId: number
): number => {
  return vacations.filter(
    (vacation) =>
      vacation.personId === personId && vacation.taskStatus === "Zrealizowano"
  ).length;
};
