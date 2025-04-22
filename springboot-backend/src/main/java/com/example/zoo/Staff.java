package com.example.zoo;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Staff {
    String staffID;
    String name;
    String role;
 
    public Staff(String staffID, String name, String role){
        this.staffID = staffID;
        this.name = name;
        this.role = role;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Staff staff = (Staff) o;

        return staffID.equals(staff.staffID);
    }

    @Override
    public int hashCode() {
        return staffID.hashCode();
    }

    @JsonProperty("id")
    public String getStaffID() {
        return staffID;
    }

    public String getName() {
        return name;
    }

    public String getRole() {
        return role;
    }

    public int getLevel(){
        return 0;
    }

    public void setStaffID(String staffID) {
        this.staffID = staffID;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setRole(String role) {
        this.role = role;
    }
    public void setLevel(int level) {
    }
}
