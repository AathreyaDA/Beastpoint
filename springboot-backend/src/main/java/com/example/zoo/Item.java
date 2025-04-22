package com.example.zoo;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Item {
    String itemID;
    String itemName;
    int quantity;

    void orderSupplies(int quantity){
        Database.getInstance().orderItem(this, quantity);
    }

    void consume(int quantity){
        Database.getInstance().consumeItem(this, quantity);
    }

    Item(String itemID, String itemName,int quantity){
        this.itemID = itemID;
        this.itemName = itemName;
        this.quantity = quantity;
    }

    @JsonProperty("id")
    public String getItemID() {
        return itemID;
    }

    public void setItemID(String itemID) {
        this.itemID = itemID;
    }

    @JsonProperty("name")
    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Item item = (Item) obj;
        return itemID.equals(item.itemID);
    }
}
