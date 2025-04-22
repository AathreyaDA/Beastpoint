package com.example.zoo;

public class HealthRecord {
    Animal animal;
    String vaccinationDetails;
    String illnessDetails;

    void updateVaccinationDetails(String vaccinationDetails){
        this.vaccinationDetails = vaccinationDetails;
    }

    void updateIllnessDetails(String illnessDetails){
        this.illnessDetails = illnessDetails;
    }

    HealthRecord(Animal animal, String vaccinationDetails, String illnessDetails){
        this.animal = animal;
        this.vaccinationDetails = vaccinationDetails;
        this.illnessDetails = illnessDetails;
    }

    public String getVaccinationDetails(){
        return vaccinationDetails;
    }

    public String getIllnessDetails(){
        return illnessDetails;
    }

}
