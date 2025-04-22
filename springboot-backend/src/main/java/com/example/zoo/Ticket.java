package com.example.zoo;

public class Ticket {
    String ticketID;
    Visitor visitor;
    float price;

    Ticket(String ticketID, Visitor visitor, float price){
        this.ticketID = ticketID;
        this.visitor = visitor;
        this.price = price;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Ticket ticket = (Ticket) o;

        return ticketID.equals(ticket.ticketID);
    }

    @Override
    public int hashCode() {
        return ticketID.hashCode();
    }
}
