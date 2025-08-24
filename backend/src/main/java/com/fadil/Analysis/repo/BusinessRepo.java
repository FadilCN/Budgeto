package com.fadil.Analysis.repo;

import com.fadil.Analysis.model.Business;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BusinessRepo extends JpaRepository<Business,Integer> {

    @Query("SELECT b FROM Business b JOIN b.expense e WHERE (:id IS NULL OR b.id =:id) AND (:type IS NULL OR e.type =:type)")
    Business  getExpensesByBusinessAndTypeParam(@Param("id") Integer id, @Param("type") String type);
}
