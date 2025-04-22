package com.example.zoo;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Animal {
    String animalID;
    String name;
    String species;
    String habitat;
    HealthRecord healthRecord;
 

    public void updateHealthRecord(String vaccinationDetails, String illnessDetails){
        if(vaccinationDetails != null){
            healthRecord.updateVaccinationDetails(vaccinationDetails);
        }

        if(illnessDetails != null){
            healthRecord.updateIllnessDetails(illnessDetails);
        }
    }

    public Animal(String animalID, String name, String species, String habitat){
        this.animalID = animalID;
        this.name = name;
        this.species = species;
        this.habitat = habitat;
        this.healthRecord = new HealthRecord(this, null, null);
    }

    public Animal(String animalID, String name, String species, String habitat, String vaccinationDetails, String illnessDetails){
        this.animalID = animalID;
        this.name = name;
        this.species = species;
        this.habitat = habitat;
        this.healthRecord = new HealthRecord(this, vaccinationDetails, illnessDetails);
    }

    public void copyFrom(Animal a){
        // this.animalID = a.animalID;
        this.name = a.name;
        this.species = a.species;
        this.habitat = a.habitat;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Animal animal = (Animal) o;

        return animalID.equals(animal.animalID);
    }

    @Override
    public int hashCode() {
        return animalID.hashCode();
    }

    @JsonProperty("id")
    public String getAnimalID() {
        return animalID;
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
    public HealthRecord getHealthRecord() {
        return healthRecord;
    }
}

