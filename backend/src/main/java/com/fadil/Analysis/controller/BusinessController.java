package com.fadil.Analysis.controller;

import com.fadil.Analysis.model.Business;
import com.fadil.Analysis.service.BusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/business")
public class BusinessController {

    @Autowired
    private BusinessService service;

    @GetMapping
    public List<Business> getAllBusiness(){
        return service.getAllBusiness();
    }

    @PostMapping
    public Business addBusiness(@RequestBody Business business){
        return service.addBusiness( business);
    }



    @PutMapping("/update/{id}")
    public Business updateBusiness(@PathVariable int id, @RequestBody Business business){
        return service.updateBusiness(id,business);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteBusiness(@PathVariable int id)
    {
        service.deleteBusiness(id);
    }

    @GetMapping("/filter")
        public Business getExpensesByBusinessAndTypeParam(@RequestParam(required = false) Integer shopId,@RequestParam(required = false) String expenseType){
           return service.getExpensesByBusinessAndTypeParam(shopId,expenseType);

        }

    }



