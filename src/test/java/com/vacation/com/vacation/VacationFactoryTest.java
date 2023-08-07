package com.vacation.com.vacation;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
public class VacationFactoryTest {
    @Test
    void testCreateHolidayLeave() {
        VacationFactory factory = new VacationFactory();
        Vacation vacation = factory.createVacation("wypoczynkowy");
        assertEquals("Urlop wypoczynkowy", vacation.Type());
    }

    @Test
    void testCreateMaternityLeave() {
        VacationFactory factory = new VacationFactory();
        Vacation urlop = factory.createVacation("macierzynski");
        assertEquals("Urlop macierzyński", urlop.Type());
    }

    @Test
    void testCreatePaternityLeave() {
        VacationFactory factory = new VacationFactory();
        Vacation vacation = factory.createVacation("tacierzynski");
        assertEquals("Urlop tacierzyński", vacation.Type());
    }

    @Test
    void testCreateAnotherLeave() {
        VacationFactory factory = new VacationFactory();
        assertThrows(IllegalArgumentException.class, () -> factory.createVacation("inne"));
    }
}
