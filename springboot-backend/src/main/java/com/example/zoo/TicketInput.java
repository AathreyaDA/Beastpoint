package com.example.zoo;

import java.util.Random;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TicketInput {
    String ticketID;
    String firstName;
    String secondName;
    float price;
    int visitors;
    String phone;

    TicketInput(String ticketID, String firstName, String secondName, String phone,  float price, int visitors){
        this.ticketID = ticketID;
        this.firstName = firstName;
        this.secondName = secondName;
        this.price = price;
        this.visitors = visitors;
        this.phone = phone;
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

    @JsonProperty("id")
    public String getTicketID() {
        return ticketID;
    }

    public String getFirstName() {
        return firstName;
    }
    public String getSecondName() {
        return secondName;
    }

    public float getPrice() {
        return price;
    }

    public int getVisitors() {
        return visitors;
    }

    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setTicketID(String ticketID) {
        this.ticketID = ticketID;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public void setSecondName(String secondName) {
        this.secondName = secondName;
    }
    public void setPrice(float price) {
        this.price = price;
    }
    public void setVisitors(int visitors) {
        this.visitors = visitors;
    }

    public void execute(){
        String visitorID = generateRandomString(7);

        Visitor visitor = new Visitor(visitorID, firstName, secondName, phone);
        for(int i=0; i<visitors; i++){
            Ticket ticket = new Ticket(ticketID+i, visitor, price);
            Database.getInstance().storeTicket(ticket);
        }
    }

    public static String generateRandomString(int length) {
        String letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        Random random = new Random();
        StringBuilder sb = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            sb.append(letters.charAt(random.nextInt(letters.length())));
        }

        return sb.toString();
    }
}
