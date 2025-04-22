package com.example.zoo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.zoo.TicketInput;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/ticket")
public class TicketController {
    @PostMapping("/add")
    public TicketInput addTicket(@RequestBody TicketInput ticketInput) {
        // Logic to add a ticket
        ticketInput.execute();
        return ticketInput;
    }
}
