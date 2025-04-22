package com.example.zoo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(exclude = {
    org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration.class,
    org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration.class
})
public class ZooApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZooApplication.class, args);
		Database db = Database.getInstance();

		db.loadData();
		// db.storeAnimal(AnimalFactory.createAnimal("3", "Komodo Dragon", "Varanus komodoensis", "grasslands", "armored"));
		// Inventory.getInstance().updateItem(new Item("I1", "Banana", 2));
		// System.out.println("count: " + Inventory.getInstance().items.get(1).quantity);
		// TicketInput ticketInput = new TicketInput("PEZ-12345", "John", "Doe", "1234567890", 20.0f, 2);
		// ticketInput.execute();

		// Animal animal1 = AnimalFactory.createAnimal("D1", "Dog", "Canis familiaris", "Urban", AnimalType.MAMMAL,  "Unvaccinated", "rabis");
		// db.storeAnimal(animal1);
	}
}
