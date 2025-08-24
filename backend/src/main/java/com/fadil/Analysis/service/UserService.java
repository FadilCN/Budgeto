package com.fadil.Analysis.service;

import com.fadil.Analysis.model.User;
import com.fadil.Analysis.repo.UserRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepo repo;

    public UserService(UserRepo repo) {
        this.repo = repo;
    }

    public List<User> getAllUser() {
        return repo.findAll();
    }

    public User addUser(User user) {
        return repo.save(user);
    }

    public User updateUser(int id, User newuser) {

        return repo.findById(id).map(olduser->{
            olduser.setName(newuser.getName());
            olduser.setLocation(newuser.getLocation());
            olduser.setEmail(newuser.getEmail());
            return repo.save(olduser);
        })
                .orElseThrow(() -> new RuntimeException("User not found"));


    }

    public void deleteUser(int id) {
        repo.deleteById(id);
    }
}
