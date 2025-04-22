package com.example.zoo;

import java.util.ArrayList;

public class Enclosure {
    String enclosureID;
    String zone;
    ArrayList<Animal> animals;

    public void assignAnimal(Animal animal){
        for(int i = 0; i < animals.size(); i++){
            if(animal.equals(animals.get(i))){
                return;
            }
        }

        animals.add(animal);
    }

    public void removeAnimal(Animal animal){
        animals.remove(animal);
    }

    public Enclosure(){
        animals = new ArrayList<Animal>();
    }
}
