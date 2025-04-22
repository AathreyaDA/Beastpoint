package com.example.zoo;

public class Visitor {
    String visitorID;
    String firstName;
    String lastName;
    String phone;

    Visitor(String visitorID, String firstName, String lastName, String phone){
        this.visitorID = visitorID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Visitor visitor = (Visitor) o;

        return visitorID.equals(visitor.visitorID);
    }

    @Override
    public int hashCode() {
        return visitorID.hashCode();
    }

}
