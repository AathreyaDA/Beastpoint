package com.example.zoo.controller;

import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.zoo.Database;
// import com.example.zoo.Database;
import com.example.zoo.Staff;
import com.example.zoo.StaffFactory;
import com.example.zoo.ZooController;
import com.example.zoo.ZooKeeper;
import com.example.zoo.ZooManager;
import com.fasterxml.jackson.annotation.JsonProperty;

class StaffRequest {
    Staff staffMember;
    String managerID;

    StaffRequest(Staff staffMember, String managerID) {
        this.staffMember = staffMember;
        this.managerID = managerID;
    }
    Staff getStaffMember() {
        return staffMember;
    }

    String getManagerID() {
        return managerID;
    }


    void setStaffMember(Staff staffMember) {
        this.staffMember = staffMember;
    }
    void setManagerID(String managerID) {
        this.managerID = managerID;
    }
}

// class ManagerStaffRequest {
//     ZooManager staffMember;
//     String managerID;

//     public ManagerStaffRequest() {}

//     public ManagerStaffRequest(ZooManager staffMember, String managerID) {
//         this.staffMember = staffMember;
//         this.managerID = managerID;
//     }
//     Staff getStaffMember() {
//         return staffMember;
//     }

//     String getManagerID() {
//         return managerID;
//     }


//     void setStaffMember(ZooManager staffMember) {
//         this.staffMember = staffMember;
//     }
//     void setManagerID(String managerID) {
//         this.managerID = managerID;
//     }
// }

class ManagerStaffRequest {
    private StaffData staffMember;
    private String managerID;

    public StaffData getStaffMember() {
        return staffMember;
    }

    public void setStaffMember(StaffData staffMember) {
        this.staffMember = staffMember;
    }

    public String getManagerID() {
        return managerID;
    }

    public void setManagerID(String managerID) {
        this.managerID = managerID;
    }

    static class StaffData {
        private String staffID;
        private String name;
        private int level;
        private String role;

        @JsonProperty("id")
        public String getStaffID() {
            return staffID;
        }

        public void setStaffID(String staffID) {
            this.staffID = staffID;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public int getLevel() {
            return level;
        }

        public void setLevel(int level) {
            this.level = level;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }
    }
}


// class UpdateStaffRequest {
//     String managerID;
//     Staff staff;

//     @JsonProperty("mid")
//     public String getManagerID() {
//         return managerID;
//     }

//     public void setManagerID(String managerID){
//         this.managerID = managerID;
//     }

//     public Staff getStaff(){
//         return staff; 
//     }

//     public void setStaff(Staff staff){
//         this.staff = StaffFactory.createStaff(staff.getStaffID(), staff.getName(), staff.getRole(), staff.getLevel());
//     }
// }


@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/staff")
public class StaffController {
    Database db = Database.getInstance();
    @GetMapping("/all")
    public ResponseEntity<Object> getAllStaff() {
        ArrayList<Staff> staff = ZooController.getInstance().getStaffGroup();
        
        return ResponseEntity.ok(staff);    
    }
    @PostMapping("/add/ZooKeeper")
    public void addZooKeeper(@RequestBody StaffRequest obj) {
        ZooKeeper newObj = new ZooKeeper(obj.staffMember.getStaffID(), obj.staffMember.getName());
        String managerID = obj.managerID;
        ZooManager manager = (ZooManager) db.getStaffByID(managerID);
        manager.addStaff(newObj.getStaffID(), newObj.getName(), "ZooKeeper", 0);
        // (StaffFactory.createStaff(zookeeper0.getStaffID(), zookeeper0.getName(), "ZooKeeper", 0));
    }

    @PostMapping("/add/ZooManager")
    public void addZooManager(@RequestBody ManagerStaffRequest obj) {
        String managerID = obj.getManagerID();
        ZooManager manager = (ZooManager) db.getStaffByID(managerID);
        manager.addStaff(obj.getStaffMember().getStaffID(), obj.getStaffMember().getName(), obj.getStaffMember().getRole(), obj.getStaffMember().getLevel());
    }

    @DeleteMapping("/remove/{id}/{managerID}")
    public void removeStaff(@PathVariable String id, @PathVariable String managerID) {
        ZooManager manager = (ZooManager) db.getStaffByID(managerID);
        Staff staff = db.getStaffByID(id);
        manager.removeStaff(staff);
    }

    @PutMapping("/update")
    public void updateStaff(@RequestBody ManagerStaffRequest staffRequest){
        Staff staff = StaffFactory.createStaff(staffRequest.getStaffMember().getStaffID(), staffRequest.getStaffMember().getName(), staffRequest.getStaffMember().getRole(), staffRequest.getStaffMember().getLevel());
        ZooManager manager = (ZooManager) db.getStaffByID(staffRequest.getManagerID());

        manager.updateStaff(db.getStaffByID(staff.getStaffID()), staff);
    }

}
