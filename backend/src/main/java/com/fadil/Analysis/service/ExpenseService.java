package com.fadil.Analysis.service;

import com.fadil.Analysis.dto.SummaryDto;
import com.fadil.Analysis.model.Business;
import com.fadil.Analysis.model.Expense;
import com.fadil.Analysis.repo.BusinessRepo;
import com.fadil.Analysis.repo.ExpenseRepo;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepo repo;

    public ExpenseService(ExpenseRepo repo) {
        this.repo = repo;
    }
    public List<Expense> getAllExpense() {
        return repo.findAll();
    }


    public Expense addExpense(Expense expense) {
        return repo.save(expense);
    }

    public void deleteExpense(int id) {
        repo.deleteById(id);
    }

    public List<SummaryDto> getMontlySummary(Integer year, Integer month, Integer id){
        return repo.getMontlySummary(year,month,id)
                .stream()
                .map(e -> new SummaryDto(
                        (Integer) e[0],
                        (Integer) e[1],
                        (Integer) e[2],
                        (String) e[3],
                        (Double) e[4],
                        (Double) e[5],
                        (Double) e[6],
                        (Double) e[7]

                )).toList();

    }

    public List<Expense> getExpenseByBusiness(int id) {
        return repo.findByBusinessId(id);
    }
}
