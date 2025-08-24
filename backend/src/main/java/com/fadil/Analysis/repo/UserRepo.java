package com.fadil.Analysis.repo;

import com.fadil.Analysis.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Integer> {

}
