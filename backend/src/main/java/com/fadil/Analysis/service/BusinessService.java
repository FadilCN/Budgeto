package com.fadil.Analysis.service;

import com.fadil.Analysis.model.Business;
import com.fadil.Analysis.repo.BusinessRepo;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class BusinessService {


    private final BusinessRepo repo;

    public BusinessService(BusinessRepo repo) {
        this.repo = repo;
    }

    public List<Business> getAllBusiness() {
        return repo.findAll();
    }


    public Business addBusiness(Business business) {
        return repo.save(business);
    }

    public void deleteBusiness(int id) {
        repo.deleteById(id);
    }

    public Business updateBusiness(int id, Business business) {
        return repo.findById(id)
                .map(newbusiness -> {
                    newbusiness.setCategory(business.getCategory());
                    newbusiness.setLocation(business.getLocation());
                    newbusiness.setName(business.getName());
                    return repo.save(newbusiness);
                })
                .orElse(null);

    }

    public Business getBusinessById(int id) {
        return repo.findById(id)
        .orElseThrow(() -> new RuntimeException("Business not found"));


    }

    public Business getExpensesByBusinessAndTypeParam(Integer id, String expenseType) {
        return repo.getExpensesByBusinessAndTypeParam(id,expenseType);
    }
}
