package com.fadil.Analysis.controller;

import com.fadil.Analysis.dto.SummaryDto;
import com.fadil.Analysis.model.Expense;

import com.fadil.Analysis.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/expense")
public class ExpenseController {

    @Autowired
    private ExpenseService service;

    @GetMapping
    public List<Expense> getAllExpense(){
        return service.getAllExpense();
    }

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense){
        return service.addExpense(expense);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteExpense(@PathVariable int id)
    {
        service.deleteExpense(id);
    }

    @GetMapping("{id}")
    public List<Expense> getExpenseByShopId(@PathVariable int id){
        return service.getExpenseByBusiness(id);
    }

    @GetMapping("/summary")
    public List<SummaryDto> getMontlySummary(@RequestParam(required = false) Integer year, @RequestParam(required = false) Integer month,@RequestParam(required = false) Integer shopId){
        return service.getMontlySummary(year, month, shopId);
    }



}
