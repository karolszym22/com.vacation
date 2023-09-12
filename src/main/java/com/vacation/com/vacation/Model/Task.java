package com.vacation.com.vacation.Model;
public class Task {


    public enum Tasks {
        ZWROC("Zwróć"),
        ZAAKCEPTUJ("Zaakceptuj"),
        ZWROC_DO_HR("Zwróć do HR"),
        ODRZUC("Odrzuć"),
        DODAJ("Dodaj"),
        DO_REALIZACJI("Do realizacji");

        private final String opis;

        Tasks(String opis) {
            this.opis = opis;
        }

        public String getOpis() {
            return opis;
        }
    }

    private Tasks task;

    public Task(Tasks task) {
        this.task = task;
    }

    public Tasks getTask() {
        return task;
    }

    public void setTask(Tasks task) {
        this.task = task;
    }
}