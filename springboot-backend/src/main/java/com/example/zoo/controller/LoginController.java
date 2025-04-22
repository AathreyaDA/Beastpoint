package com.example.zoo.controller;

import java.util.ArrayList;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.zoo.Database;
// import com.example.zoo.Staff;
// import org.springframework.web.bind.annotation.PostMapping;

class LoginResponse{
    String id;
    String name;
    String password;
    String role;
    int level;

    LoginResponse(String id, String name, String password, String role, int level) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.role = role;
        this.level = level;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPassword() {
        return password;
    }

    public String getRole() {
        return role;
    }

    public int getLevel() {
        return level;
    }
}

class RegisterRequest{
    String id;
    String password;

    String getId() {
        return id;
    }
    String getPassword() {
        return password;
    }
    void setId(String id) {
        this.id = id;
    }
    void setPassword(String password) {
        this.password = password;
    }

    RegisterRequest(String id, String password) {
        this.id = id;
        this.password = password;
    }
}

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/login")
public class LoginController {
    Database db = Database.getInstance();
    @GetMapping("/{username}/{password}")
    public ResponseEntity<Object> login(@PathVariable String username, @PathVariable String password) {
        ArrayList<String> user = db.login(username, password);
        if ( user != null) {
            LoginResponse l = new LoginResponse(username, user.get(1), password, user.get(2), Integer.parseInt(user.get(3)));
            return ResponseEntity.ok(l);
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @PostMapping("/register")
    public void register(@RequestBody RegisterRequest obj) {
        db.registerStaff(obj.getId(), obj.getPassword());
    }
}
