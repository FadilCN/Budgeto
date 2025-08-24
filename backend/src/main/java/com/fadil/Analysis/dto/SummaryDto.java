package com.fadil.Analysis.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SummaryDto {
    private Integer year;
    private Integer month;
    private Integer id;
    private String businessName;
    private Double expense;
    private Double sales;
    private Double credit;
    private Double savings;
}
