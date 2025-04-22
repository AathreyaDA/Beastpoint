package com.example.zoo.controller;


import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.zoo.Animal;
import com.example.zoo.AnimalFactory;
import com.example.zoo.Database;
import com.fasterxml.jackson.annotation.JsonProperty;

class AnimalResponse extends Animal{
    AnimalResponse(Animal animal){
        super(animal.getAnimalID(), animal.getName(), animal.getSpecies(), animal.getHabitat());
        this.vaccinationDetails = animal.getHealthRecord().getVaccinationDetails();
        this.illnessDetails = animal.getHealthRecord().getIllnessDetails();
    }
 
    String vaccinationDetails;
    String illnessDetails;

    @JsonProperty("id")
    public String getAnimalID() {
        return getAnimalID();
    }


    public String getVaccinationDetails() {
        return vaccinationDetails;
    }

    public String getIllnessDetails() {
        return illnessDetails;
    }
}


class AnimalAddRequest {
    String animalID;
    String name;
    String species;
    String habitat;
    String type;

    AnimalAddRequest(String animalID, String name, String species, String habitat, String type) {
        this.animalID = animalID;
        this.name = name;
        this.species = species;
        this.habitat = habitat;
        this.type = type;
    }

    public Animal toAnimal() {
        return AnimalFactory.createAnimal(animalID, name, species, habitat, AnimalFactory.stringToAnimalType(type));
    }

    
    public String getName() {
        return name;
    }

    public String getSpecies() {
        return species;
    }

    public String getHabitat() {
        return habitat;
    }

    public String getType() {
        return type;
    }

    @JsonProperty("id")
    public String getAnimalID() {
        return animalID;
    }

    public void setAnimalID(String animalID) {
        this.animalID = animalID;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public void setHabitat(String habitat) {
        this.habitat = habitat;
    }
    public void setType(String type) {
        this.type = type;
    }

}
@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/animal")
public class AnimalController {
    Database db = Database.getInstance();
    @GetMapping("/all")
    public ResponseEntity<Object> getAllAnimals() {
        ArrayList<Animal> animals = db.getAnimals();
        return ResponseEntity.ok(animals);
    }

    @PostMapping("/add")
    public void addAnimal(@RequestBody AnimalAddRequest animal) {
        db.storeAnimal(AnimalFactory.createAnimal(animal.animalID, animal.name, animal.species, animal.habitat, AnimalFactory.stringToAnimalType(animal.type)));
    }
}
