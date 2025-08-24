package com.fadil.Analysis.controller;

import com.fadil.Analysis.model.User;
import com.fadil.Analysis.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping
    public List<User> getAllUser()
    {
       return service.getAllUser();
    }

    @PostMapping
    public User addUser(@RequestBody User user)
    {
        return service.addUser(user);
    }

    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable int id , @RequestBody User user)
    {
        return service.updateUser(id,user);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable int id)
    {
        service.deleteUser(id);
    }

}
