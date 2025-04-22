package com.example.zoo;

import java.util.ArrayList;


public class ZooKeeper extends Staff {
    ArrayList<Animal> assignedAnimals;
    
    void feedAnimals(){
    }

    void cleanEnclosures(){

    }    

    void updateHealthRecords(Animal animal, String vaccinationDetails, String illnessDetails){
        animal.updateHealthRecord(vaccinationDetails, illnessDetails);
    }
    
    public ZooKeeper(String staffID, String name){
        super(staffID, name, "ZooKeeper");
        assignedAnimals = new ArrayList<Animal>();
    }

}
