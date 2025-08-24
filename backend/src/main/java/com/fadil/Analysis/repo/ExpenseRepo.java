package com.fadil.Analysis.repo;

import com.fadil.Analysis.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExpenseRepo extends JpaRepository<Expense,Integer> {

    List<Expense> findByBusinessId(int BusinessId);

    @Query("SELECT YEAR(e.date) , MONTH(e.date), e.business.id, e.business.name, "+
            "SUM(CASE WHEN e.type = 'expense' THEN e.amount ELSE 0 END), "+
            "SUM(CASE WHEN e.type = 'sales' THEN e.amount ELSE 0 END), "+
            "SUM(CASE WHEN e.type = 'credit' THEN e.amount ELSE 0 END), "+
            "SUM(CASE WHEN e.type = 'savings' THEN e.amount ELSE 0 END) "+

    "FROM Expense e "+
            "WHERE (:year IS NULL OR YEAR(e.date)=:year) "+
            "AND (:month IS NULL OR MONTH(e.date)=:month) "+
            "AND (:businessId IS NULL OR e.business.id=:businessId) "+
    "GROUP BY YEAR(e.date) ,MONTH(e.date), e.business.id "+
    "ORDER BY YEAR(e.date) ,MONTH(e.date), e.business.id ")
    List<Object[]> getMontlySummary(@Param("year") Integer year, @Param("month") Integer month, @Param("businessId") Integer id);


}


