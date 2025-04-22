package com.example.zoo;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ZooManager extends Staff {
    int managerLevel;
    private Database database;

    public void addStaff(String staffID, String name, String role, int level){
        if(("ZooManager".equals(role)) && (level >= managerLevel)){
            System.out.println("Can't add higher managers");
            return;
        }

        Staff staff = StaffFactory.createStaff(staffID, name, role, level);
        database.storeStaff(staff);
    }


    public void addStaff(Staff staff){
        if(("ZooManager".equals(role)) && (((ZooManager)staff).managerLevel > managerLevel)){
            System.out.println("Can't add higher managers");
            return;
        }
        database.storeStaff(staff);
    }

    public void removeStaff(Staff staff){
        if(staff instanceof ZooManager){
            ZooManager staffZ = (ZooManager) staff;
            if(staffZ.managerLevel >= managerLevel){
                System.out.println("Can't remove higher managers");
                return;
            }
        }
        database.removeStaff(staff);
    }

    public void updateStaff(Staff staff1, Staff staff2){
        if(staff1 instanceof ZooManager){
            ZooManager staffZ = (ZooManager) staff1;
            if(staffZ.managerLevel >= managerLevel){
                System.out.println("Can't edit higher managers");
                return;
            }
            if(staff2 instanceof ZooManager){
                if(((ZooManager)staff2).managerLevel >= managerLevel){
                    System.out.println("Can't edit higher managers");
                    return;
                }
            }
                if(staff2.role.equals("ZooKeeper")){
                    staff1.role = "ZooKeeper";
                    // ((ZooManager)staff1).level = 0;
                    staff1.setLevel(0);
                    staff1 = new Staff(staff1.getStaffID(), staff1.getName(), "ZooKeeper");
                }
                else{
                    ((ZooManager)staff1).managerLevel = ((ZooManager)staff2).managerLevel;
                }

                if(!(staff1 instanceof ZooManager) && (staff2 instanceof ZooManager)){
                    staff1 = (ZooManager)staff2;
                }
                
        }

        staff1.name = staff2.name;
        staff1.role = staff2.role;
        database.updateStaff(staff1, staff2);
    }

    public ZooManager(String staffID, String name){
        super(staffID, name, "ZooManager");
        this.managerLevel = 1;
        this.database = Database.getInstance();
    }

    public ZooManager(String staffID, String name, int level){
        super(staffID, name, "ZooManager");
        this.managerLevel = level;
        this.database = Database.getInstance();
    }


    @Override
    public int getLevel(){
        return managerLevel;
    }

    @JsonProperty("level")
    public int getManagerLevel(){
        return managerLevel;
    }

    public void setManagerLevel(int level){
        this.managerLevel = level;
    }

    @Override
    public void setLevel(int level){
        this.managerLevel = level;
    }
}
