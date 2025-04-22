package com.example.zoo.controller;

import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.example.zoo.Inventory;
import com.example.zoo.Item;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/inventory")
public class InventoryController {
    // Database db = Database.getInstance();
    Inventory inventory = Inventory.getInstance();
    @GetMapping("/all")
    public ResponseEntity<Object> getAllItems() {
        ArrayList<Item> items = inventory.getItems();
        return ResponseEntity.ok(items);
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addItem(@RequestBody Item item) {
        inventory.addItem(item);
        return ResponseEntity.ok("Item added");
    }

    @PutMapping("/update")
    public ResponseEntity<Object> updateItem(@RequestBody Item item) {
        inventory.updateItem(item);
        return ResponseEntity.ok("Item updated");
    }
}
