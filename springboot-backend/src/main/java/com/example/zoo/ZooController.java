package com.example.zoo;

import java.util.ArrayList;

enum Option{
    add, remove, update
}

public class ZooController {
    private static ZooController instance;
    private ArrayList<Animal> animals;
    private ArrayList<Staff> staffGroup;
    private ArrayList<Ticket> tickets;
    private ArrayList<Visitor> visitors;

    void manageAnimals(Option option, Animal animal){
        switch(option){
            case add:
                if(!animals.contains(animal)){
                    animals.add(animal);
                }
                // Database.getInstance().storeAnimal(animal);
                break;
            case remove:
                animals.remove(animal);
                // Database.getInstance().removeAnimal(animal);
            case update:
                break;
        }
    }

    void manageAnimals(Option option, Animal animal1, Animal animal2){
        switch(option){
            case add:
                if(!animals.contains(animal1)){
                    animals.add(animal1);
                }
                // Database.getInstance().storeAnimal(animal1);
                break;
            case remove:
                animals.remove(animal1);
                // Database.getInstance().removeAnimal(animal1);
                break;
            case update:
                int index = animals.indexOf(animal1);
                animals.set(index, animal2);
                // Database.getInstance().updateAnimal(animal1, animal2);
                break;
        }
    }
    

    void manageStaff(Option option, Staff staff){
        switch(option){
            case add:
                if(!staffGroup.contains(staff)){
                    // Database.getInstance().storeStaff(staff);
                    staffGroup.add(staff);
                }
                break;
            case remove:
                // Database.getInstance().removeStaff(staff);
                staffGroup.remove(staff);
            case update:
                break;
            
        }
    }

    void manageStaff(Option option, Staff staff, Staff updatedStaff){
        switch(option){
            case add:
                if(!staffGroup.contains(staff)){
                    // Database.getInstance().storeStaff(staff);
                    staffGroup.add(staff);
                }
                break;
            case remove:
                // Database.getInstance().removeStaff(staff);
                staffGroup.remove(staff);
                break;
            case update:
                // Database.getInstance().updateStaff(staff, updatedStaff);
                staff.name = updatedStaff.name;
                staff.role = updatedStaff.role;
                if(updatedStaff instanceof ZooManager){
                    ((ZooManager)staff).managerLevel = ((ZooManager)updatedStaff).managerLevel;
                }
                break;
        }
    }

    void manageTickets(Option option, Ticket ticket){
        switch(option){
            case add:
                if(!tickets.contains(ticket)){
                    tickets.add(ticket);
                }
                break;
            case remove:
                tickets.remove(ticket);
                // Database.getInstance().deleteTicket(ticket);
            case update:
                break;
        }
    }

    void manageInventory(Option option, Item item, int quantity){
        switch(option){
            case add:
                item.quantity = item.quantity + quantity;
                break;
            case remove:
                item.quantity = Math.max(0, item.quantity - quantity);
            case update:
                break;
        }
    }

    public static ZooController getInstance(){
        if(instance == null){
            instance = new ZooController();
        }

        return instance;
    }

    private ZooController(){
        this.animals = new ArrayList<Animal>();
        this.staffGroup = new ArrayList<Staff>();
        this.tickets = new ArrayList<Ticket>();

    }


    public ArrayList<Animal> getAnimals(){
        return animals;
    }
    public ArrayList<Staff> getStaffGroup(){
        return staffGroup;
    }
    public ArrayList<Ticket> getTickets(){
        return tickets;
    }
    public ArrayList<Visitor> getVisitors(){
        return visitors;
    }

    public void setAnimals(ArrayList<Animal> animals){
        this.animals = animals;
    }
    public void setStaffGroup(ArrayList<Staff> staffGroup){
        this.staffGroup = staffGroup;
    }
    public void setTickets(ArrayList<Ticket> tickets){
        this.tickets = tickets;
    }
    public void setVisitors(ArrayList<Visitor> visitors){
        this.visitors = visitors;
    }
    
    
}
