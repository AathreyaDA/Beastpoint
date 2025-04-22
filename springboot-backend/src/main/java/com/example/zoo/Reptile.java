package com.example.zoo;

public class Reptile extends Animal {
    String scaleType;
    Reptile(String animalID, String name, String species, String habitat, String scaleType){
        super(animalID, name, species, habitat);
        this.scaleType = scaleType;
    }
 
}

