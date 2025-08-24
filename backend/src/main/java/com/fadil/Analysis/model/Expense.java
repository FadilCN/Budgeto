package com.fadil.Analysis.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private float amount;
    private String description;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date date;
    private String type;

    @JsonBackReference
    @ManyToOne
    private Business business;



}
