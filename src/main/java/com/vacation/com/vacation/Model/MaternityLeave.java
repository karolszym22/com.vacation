package com.vacation.com.vacation.Model;

import com.vacation.com.vacation.Model.Vacation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity

@Table(name = "MaternityLeave")
public class MaternityLeave implements Vacation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Temporal(TemporalType.DATE)
    private Date endDate;
    private String description;
    private int daysNum;
    private boolean done;
    @Override
    public String Type() {
        return "Urlop macierzyński";
    }
}
