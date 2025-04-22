package com.example.zoo;

import java.util.ArrayList;

public class Inventory {
    private static Inventory instance;
    private Database db;
    ArrayList<Item> items;

    public static Inventory getInstance(){
        if(instance == null){
            instance = new Inventory();
        }
        return instance;
    }

    ArrayList<Item> trackInventory(){
        return items;
    }

    
    public boolean exists(Item item){
        for(int i = 0; i<items.size(); i++){
            if(items.get(i).itemID == item.itemID){
                return true;
            }
        }

        return false;
    }

    private Inventory(){
        items = new ArrayList<Item>();
        db = Database.getInstance();
    };

    public ArrayList<Item> getItems(){
        return items;
    }

    public void setItems(ArrayList<Item> items){
        this.items = items;
    }

    public void addItem(Item item){
        if(!items.contains(item)){
            items.add(item);
            db.storeItem(item);
        }else{
            System.out.println("Item already exists in inventory");
        }
    }

    public void updateItem(Item item2){

        int index  = -1;
        for(int i = 0; i<items.size(); i++){
            if(items.get(i).itemID.equals(item2.itemID)){
                index = i;
                break;
            }
        }
        if(index != -1){
            items.get(index).setQuantity(item2.getQuantity());
            // System.out.println(items.get(index).getItemName());
        }else{
            System.out.println("Item not found in inventory");
        }

        db.updateItems();
    }
}
