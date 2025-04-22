package com.example.zoo;

public class StaffFactory {
    public static Staff createStaff(String staffID, String name, String role){
        switch(role.trim().toLowerCase()){
            case "zookeeper":
                return new ZooKeeper(staffID, name);

            case "zoomanager":
                return new ZooManager(staffID, name);

            default:
                return new Staff(staffID, name, role);

        }
    }
 
    public static Staff createStaff(String staffID, String name, String role, int level){
        switch(role.trim().toLowerCase()){
            case "zookeeper":
                return new ZooKeeper(staffID, name);

            case "zoomanager":
                return new ZooManager(staffID, name, level);

            default:
                return new Staff(staffID, name, role);
        }
    }
}
