package com.example.zoo;

enum AnimalType {
    MAMMAL,
    BIRD,
    REPTILE
}

public class AnimalFactory {
    public static Mammal createAnimal(String animalID, String name, String species, String habitat, int gestationPeriod) {
        return new Mammal(animalID, name, species, habitat, gestationPeriod);
    }

    public static Bird createAnimal(String animalID, String name, String species, String habitat, double wingSpan, boolean canFly) {
        return new Bird(animalID, name, species, habitat, wingSpan, canFly);
    }

    public static Reptile createAnimal(String animalID, String name, String species, String habitat, String scaleType) {
        return new Reptile(animalID, name, species, habitat, scaleType);
    }

    public static Animal createAnimal(String animalID, String name, String species, String habitat) {
        return new Animal(animalID, name, species, habitat);
    }
    public static Animal createAnimal(String animalID, String name, String species, String habitat, String vaccinationDetails, String illnessDetails) {
        return new Animal(animalID, name, species, habitat, vaccinationDetails, illnessDetails);
    }

    public static Animal createAnimal(String animalID, String name, String species, String habitat, AnimalType type) {
        switch (type) {
            case MAMMAL:
                return new Mammal(animalID, name, species, habitat, 0);
            case BIRD:
                return new Bird(animalID, name, species, habitat, 0.0, false);
            case REPTILE:
                return new Reptile(animalID, name, species, habitat, null);
        }
        return new Animal(animalID, name, species, habitat);
    }

    public static Animal createAnimal(String animalID, String name, String species, String habitat, AnimalType type, String vaccinationDetails, String illnessDetails) {
        switch (type) {
            case MAMMAL:
                Mammal mammal =  new Mammal(animalID, name, species, habitat, 0);
                mammal.updateHealthRecord(vaccinationDetails, illnessDetails);
                return mammal;

            case BIRD:
                Bird bird = new Bird(animalID, name, species, habitat, 0.0, false);
                bird.updateHealthRecord(vaccinationDetails, illnessDetails);
                return bird;
            case REPTILE:
                Reptile reptile = new Reptile(animalID, name, species, habitat, null);
                reptile.updateHealthRecord(vaccinationDetails, illnessDetails);
                return reptile;
        }
        return new Animal(animalID, name, species, habitat);
    }

    public static AnimalType stringToAnimalType(String inp){
        switch(inp){
            case "Mammal":
                return AnimalType.MAMMAL;
            case "Bird":
                return AnimalType.BIRD;
            default :
                return AnimalType.REPTILE;
        }
    }
}
