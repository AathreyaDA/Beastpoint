package com.example.zoo;

public class Mammal extends Animal {
    int gestationPeriod;
    Mammal(String animalID, String name, String species, String habitat, int gestationPeriod){
        super(animalID, name, species, habitat);
        this.gestationPeriod = gestationPeriod;
    }
}
 