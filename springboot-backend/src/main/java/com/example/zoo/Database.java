package com.example.zoo;

import java.io.IOException;
import java.io.InputStream;
import java.sql.*;
import java.util.ArrayList;
import java.util.Properties;

public class Database {
    private static Database instance;
    private Connection conn;
    private ZooController zooController;

    private String url = "jdbc:mysql://localhost:3307/zoo"; 
    private String user;
    private String password; 
    
    public static Database getInstance() {
        if(instance == null){
            instance = new Database();
        }
        return instance;
    }

    private Database(){
        zooController = ZooController.getInstance();
        Properties props = new Properties();
        try (InputStream input = getClass().getClassLoader().getResourceAsStream("config.properties")) {
            props.load(input);
        }
        catch(IOException e){
            System.err.println(e);
        }

        this.user = props.getProperty("db.username");
        this.password = props.getProperty("db.password");   
        
        try{
            conn = DriverManager.getConnection(url, user, password);
        }
        catch(SQLException e){
            System.err.println();
        }
    }

    public String getTestByName(String name){
        try{
            PreparedStatement statement = conn.prepareStatement("SELECT * FROM test WHERE test_name=?");
            statement.setString(1, name);

            ResultSet rs = statement.executeQuery();

            while(rs.next()){
                int testID = rs.getInt("test_id");
                String testName = rs.getString("test_name");

                System.out.println("ID: " + testID + " | Name: " + testName);
            }
        }
        catch(SQLException e){
            System.err.println(e);
        }
        return "";
    }

    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//TicketData VisitorData
    public void storeTicket(Ticket ticket) {
        try{
            String visitorID = ticket.visitor.visitorID;
            PreparedStatement statement1 = conn.prepareStatement("SELECT * FROM visitor WHERE visitor_id=?");
            statement1.setString(1, visitorID);

            ResultSet rs = statement1.executeQuery();

            if(! rs.next()){
                // System.out.println("Visitor ID not found");
                PreparedStatement statement1_1 = conn.prepareStatement("INSERT INTO visitor VALUE(?, ?, ?, ?)");
                statement1_1.setString(1, visitorID);
                statement1_1.setString(2, ticket.visitor.firstName);
                statement1_1.setString(3, ticket.visitor.lastName);
                statement1_1.setString(4, ticket.visitor.phone);
                statement1_1.execute();
            }

            PreparedStatement statement2 = conn.prepareStatement("INSERT INTO ticket VALUE(?, ?, ?)");

            statement2.setString(1, ticket.ticketID);
            statement2.setString(2, visitorID);
            statement2.setFloat(3, ticket.price);

            if(!zooController.getTickets().contains(ticket)){
                zooController.manageTickets(Option.add, ticket);
            }
            statement2.execute();
        }
        catch(SQLException e){
            System.err.println(e);
        }
    }

    public void deleteTicket(Ticket ticket){
        try{
            PreparedStatement statement = conn.prepareStatement("DELETE FROM ticket WHERE ticket_id=?;");

            statement.setString(1, ticket.ticketID);
            statement.execute();

            zooController.manageTickets(Option.remove, ticket);
        }
        catch(SQLException e){
            System.err.println(e);
        }
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//AnimalData
    public void storeAnimal(Animal animal){
        try{
            PreparedStatement statement = conn.prepareStatement("INSERT INTO animal VALUE(?, ?, ?, ?, ?);");

            statement.setString(1, animal.animalID);
            statement.setString(2, animal.name);
            statement.setString(3, animal.species);
            statement.setString(4, animal.habitat);

            String type = "";
            if(animal instanceof Mammal){
                type = "Mammal";
            }
            else if(animal instanceof Bird){
                type = "Bird";
            }
            else if(animal instanceof Reptile){
                type = "Reptile";
            }

            statement.setString(5, type);

            if(!zooController.getAnimals().contains(animal)){
                zooController.manageAnimals(Option.add, animal);
            }
            statement.execute();

            PreparedStatement statement2 = conn.prepareStatement("INSERT INTO health_record VALUE(?, ?, ?);");
            statement2.setString(1, animal.animalID);
            statement2.setString(2, animal.healthRecord.vaccinationDetails);
            statement2.setString(3, animal.healthRecord.illnessDetails);
            statement2.execute();

        }
        catch(SQLException e){
            System.err.println(e);
        }
    }
    public void removeAnimal(Animal animal){
        try {
            PreparedStatement statement1 = conn.prepareStatement("DELETE FROM health_record WHERE animal_id=?");
            PreparedStatement statement2 = conn.prepareStatement("DELETE FROM animal WHERE animal_id=?");

            statement1.setString(1, animal.animalID);
            statement2.setString(1, animal.animalID);

            statement1.execute();
            statement2.execute();

            // zooController.animals.remove(animal);
            zooController.manageAnimals(Option.remove, animal);
        } catch (SQLException e) {
            System.err.println(e);
        }
    }
    public void updateAnimal(Animal animal1, Animal animal2){
        if(animal1.animalID != animal2.animalID){
            return;
        }
        try {
        PreparedStatement statement = conn.prepareStatement("UPDATE animal SET animal_name=?, animal_species=?, habitat=? WHERE animal_id=?");
        statement.setString(1, animal2.name);
        statement.setString(2, animal2.species);
        statement.setString(3, animal2.habitat);
        statement.setString(4, animal1.animalID);
        
        // int index = zooController.animals.indexOf(animal1);
        animal1.copyFrom(animal2);
        // zooController.animals.set(index, animal1);
        statement.execute();
        }
        catch(SQLException e){
            System.err.println(e);
        }
    }
    public void updateHealthRecord(HealthRecord h1, String vaccinationDetails, String illnessDetails){
        try{
        PreparedStatement statement = conn.prepareStatement("UPDATE health_record SET vaccination_details=?, illness_details=? WHERE animal_id=?");
        statement.setString(1, vaccinationDetails);
        statement.setString(2, illnessDetails);
        statement.setString(3, h1.animal.animalID);
        statement.execute();
        h1.updateVaccinationDetails(vaccinationDetails);
        h1.updateIllnessDetails(illnessDetails);
        }
        catch(SQLException e){
            System.err.println(e);
        }
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//StaffData
    public void storeStaff(Staff staff) {
        try{
            int level = (staff instanceof ZooManager) ? ((ZooManager)staff).managerLevel : 0;
            PreparedStatement statement = conn.prepareStatement("INSERT INTO staff VALUE(?, ?, ?, ?)");
            statement.setString(1, staff.staffID);
            statement.setString(2, staff.name);
            statement.setString(3, staff.role);
            statement.setInt(4, level);
            statement.execute();

            zooController.manageStaff(Option.add, staff);
        }
        catch(SQLException e){
            System.err.println(e);
        }
    }

    public void removeStaff(Staff staff) {
        try{
            PreparedStatement statement = conn.prepareStatement("DELETE FROM staff WHERE staff_id=?;");
            statement.setString(1, staff.staffID);
            statement.execute();

            zooController.manageStaff(Option.remove, staff);
        }
        catch(SQLException e){
            System.err.println(e);
        }
    }

    public void updateStaff(Staff staff1, Staff staff2){
        if(!staff1.staffID.equals(staff2.staffID)){
            return;
        }
        try{
            int level = (staff2 instanceof ZooManager) ? ((ZooManager)staff2).managerLevel : 0;
            PreparedStatement statement = conn.prepareStatement("UPDATE staff SET staff_name=?, staff_role=?, staff_level=? WHERE staff_id=?");
            statement.setString(1, staff2.name);
            statement.setString(2, staff2.role);
            statement.setInt(3, level);
            statement.setString(4, staff1.staffID);
            statement.execute();

            zooController.manageStaff(Option.update, staff1, staff2);
        }
        catch(SQLException e){
            System.err.println(e);
        }
    }
    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ItemData
    public void orderItem(Item item, int quantity){
        Inventory inventory = Inventory.getInstance();
        
        try{
            if(!inventory.exists(item)){
                PreparedStatement statement0 = conn.prepareStatement("INSERT INTO item VALUE(?, ?, ?);");
                statement0.setString(1, item.itemID);
                statement0.setString(2, item.itemName);
                statement0.setInt(3, item.quantity);
                inventory.items.add(item);
                statement0.execute();
            }
            PreparedStatement statement = conn.prepareStatement("UPDATE item SET quantity=? WHERE item_id=?;");
            statement.setInt(1, item.quantity + quantity);
            statement.setString(2, item.itemID);

            item.quantity  = item.quantity + quantity;
            statement.execute();
        }
        catch(SQLException e){
            System.err.println(e);
        }
    }

    void consumeItem(Item item, int quantity){
        Inventory inventory = Inventory.getInstance();
        try{
            if(!inventory.exists(item)){
                System.out.println("Item not found in inventory");
                return;
            }
            PreparedStatement statement = conn.prepareStatement("UPDATE item SET quantity=? WHERE item_id=?;");
            int finalQuantity = Math.max(0,item.quantity - quantity);
            statement.setInt(1, finalQuantity);
            statement.setString(2, item.itemID);

            item.quantity  = finalQuantity;
            statement.execute();
        }
        catch(SQLException e){
            System.err.println(e);
        }
    }

/////////////////////////////////////////////////////////////////////////////////////////
//plainData
public void loadData(){
    ArrayList<Ticket> tickets  = new ArrayList<Ticket>();
    ArrayList<Visitor> visitors = new ArrayList<Visitor>();
    ArrayList<Animal> animals = new ArrayList<Animal>();
    ArrayList<Staff> staff = new ArrayList<Staff>();
    ArrayList<Item> items = new ArrayList<Item>();
    // ArrayList<Animal, Staff> assignedAnimals = new ArrayList<>();
    try{
        PreparedStatement statement = conn.prepareStatement("SELECT * FROM ticket NATURAL JOIN visitor;");
        ResultSet rs = statement.executeQuery();

        while(rs.next()){
            String ticketID = rs.getString("ticket_id");
            float price = rs.getFloat("price");

            String visitorID = rs.getString("visitor_id");
            String firstName = rs.getString("first_name");
            String lastName = rs.getString("last_name");
            String phone = rs.getString("phone");

            Visitor visitor = new Visitor(visitorID, firstName, lastName, phone);
            // Visitor visitor = new Visitor
            tickets.add(new Ticket(ticketID, visitor, price));
            if(!visitors.contains(visitor)){
                // System.out.println("hmm");
                visitors.add(visitor);
            }
        }

        zooController.setTickets(tickets);
        zooController.setVisitors(visitors);

        PreparedStatement statement2 = conn.prepareStatement("SELECT * FROM animal NATURAL JOIN health_record;");
        ResultSet rs2 = statement2.executeQuery();
        while(rs2.next()){
            String animalID = rs2.getString("animal_id");
            String name = rs2.getString("animal_name");
            String species = rs2.getString("animal_species");
            String habitat = rs2.getString("habitat");
            String vaccinationDetails = rs2.getString("vaccination_details");
            String illnessDetails = rs2.getString("illness_details");
            String type = rs2.getString("type");
            Animal animal = AnimalFactory.createAnimal(animalID, name, species, habitat, AnimalFactory.stringToAnimalType(type));
            animal.healthRecord = new HealthRecord(animal, vaccinationDetails, illnessDetails);
            // Animal animal = new Animal(animalID, name, species, habitat, vaccinationDetails, illnessDetails);
            animals.add(animal);
        }
        zooController.setAnimals(animals);

        PreparedStatement statement3 = conn.prepareStatement("SELECT * FROM staff;");
        ResultSet rs3 = statement3.executeQuery();
        while(rs3.next()){
            String staffID = rs3.getString("staff_id");
            String name = rs3.getString("staff_name");
            String role = rs3.getString("staff_role");
            int level = rs3.getInt("staff_level");

            Staff staffMember;
            if(role.equals("ZooManager")){
                staffMember = (ZooManager)(StaffFactory.createStaff(staffID, name, role, level));
            }
            else if (role.equals("ZooKeeper")){
                staffMember = (ZooKeeper)(StaffFactory.createStaff(staffID, name, role));
            }
            else{
                staffMember = StaffFactory.createStaff(staffID, name, role);
            }

            if(staffMember instanceof ZooKeeper){
                PreparedStatement statement3_1 = conn.prepareStatement("SELECT * FROM assigned_animal WHERE staff_id=?;");
                statement3_1.setString(1, staffID);
                ResultSet rs3_1 = statement3_1.executeQuery();
                while(rs3_1.next()){
                    String animalID = rs3_1.getString("animal_id");
                    Animal animal = getAnimalByID(animalID);
                    if(animal != null){
                        ((ZooKeeper)staffMember).assignedAnimals.add(animal);
                    }
                }
            }
            staff.add(staffMember);
        }
        zooController.setStaffGroup(staff);

        PreparedStatement statement4 = conn.prepareStatement("SELECT * FROM item;");
        ResultSet rs4 = statement4.executeQuery();
        while(rs4.next()){
            String itemID = rs4.getString("item_id");
            String itemName = rs4.getString("item_name");
            int quantity = rs4.getInt("quantity");

            Item item = new Item(itemID, itemName, quantity);
            items.add(item);
        }
        Inventory.getInstance().items = items;
    }
    catch(SQLException e){
        System.err.println(e);
    }
}

public ArrayList<Ticket> getTickets(){
    return zooController.getTickets();
}
public ArrayList<Visitor> getVisitors(){
    return zooController.getVisitors();
}
public ArrayList<Animal> getAnimals(){
    return zooController.getAnimals();
}

public Animal getAnimalByID(String animalID){
    for(Animal animal : zooController.getAnimals()){
        if(animal.animalID.equals(animalID)){
            return animal;
        }
    }
    return null;
}

public Staff getStaffByID(String staffID){
    for(Staff staff : zooController.getStaffGroup()){
        if(staff.staffID.equals(staffID)){
            return staff;
        }
    }
    return null;
}

public ArrayList<Staff> getStaff(){
    return zooController.getStaffGroup();
}
public ArrayList<Item> getItems(){
    return Inventory.getInstance().items;
}

public ArrayList<Animal> getAssinedAnimals(Staff staff){
    if(staff instanceof ZooKeeper){
        return ((ZooKeeper)staff).assignedAnimals;
    }
    return null;
}

public void storeItem(Item item){
    try{
        PreparedStatement statement = conn.prepareStatement("INSERT INTO item VALUE(?, ?, ?);");
        statement.setString(1, item.itemID);
        statement.setString(2, item.itemName);
        statement.setInt(3, item.quantity);
        statement.execute();
    }
    catch(SQLException e){
        System.err.println(e);
    }
}


public void updateItems(){
    Inventory inventory = Inventory.getInstance();
    try{
        for(Item item : inventory.items){
            PreparedStatement statement = conn.prepareStatement("UPDATE item SET quantity=? WHERE item_id=?;");
            statement.setInt(1, item.quantity);
            statement.setString(2, item.itemID);
            statement.execute();
        }
    }
    catch(SQLException e){
        System.err.println(e);
    }
}

public ArrayList<String> login(String username, String password) {
    try {
        PreparedStatement statement = conn.prepareStatement("SELECT * FROM (staffLogin NATURAL JOIN staff)  WHERE staff_id=? AND staff_password=?;");
        statement.setString(1, username);
        statement.setString(2, password);
        ResultSet rs = statement.executeQuery();
        if(rs.next()){
            String staffID = rs.getString("staff_id");
            String name = rs.getString("staff_name");
            String role = rs.getString("staff_role");
            int level = rs.getInt("staff_level");
            ArrayList<String> result = new ArrayList<String>();
            result.add(staffID);
            result.add(name);
            result.add(role);
            result.add(String.valueOf(level));

            return result;
        } else {
            return null;
        } 
    } catch (SQLException e) {
        System.err.println(e);
        return null;
    }
    }

public void registerStaff(String id, String password) {
    try {
        PreparedStatement statement = conn.prepareStatement("INSERT INTO staffLogin VALUE(?, ?);");
        statement.setString(1, id);
        statement.setString(2, password);
        statement.execute();
    } catch (SQLException e) {
        System.err.println(e);
    }
    }
}

