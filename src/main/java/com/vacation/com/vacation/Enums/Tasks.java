package com.vacation.com.vacation.Enums;

public enum Tasks {
    ZWROC("Zwróć"),
    ZAKCEPTUJ("Zakceptuj"),
    ZWROC_DO_HR("Zwróć do HR"),
    ODRZUC("Odrzuć"),
    DODAJ("Dodaj");

    private final String opis;

    Tasks(String opis) {
        this.opis = opis;
    }

    public String getOpis() {
        return opis;
    }
}
