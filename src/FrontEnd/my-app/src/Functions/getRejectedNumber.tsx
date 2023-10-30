import { Vacation } from "../Types/Vacation";

export const countRejectedVacations = (
  vacations: Vacation[],
  personId: number
): number => {
  return vacations.filter(
    (vacation) =>
      vacation.personId === personId && vacation.taskStatus === "Odrzucono"
  ).length;
};