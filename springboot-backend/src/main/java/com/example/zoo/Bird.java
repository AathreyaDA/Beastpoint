package com.example.zoo;

public class Bird extends Animal {
    boolean canFly;
    double wingSpan;
    Bird(String animalID, String name, String species, String habitat, double wingSpan, boolean canFly){
        super(animalID, name, species, habitat);
        this.canFly = canFly;
        this.wingSpan = wingSpan;
    }
}