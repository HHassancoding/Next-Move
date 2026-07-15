package org.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


/**
 * Spring Boot application entry point.
 *
 * The project uses top-level packages like `controller`, `service`, `Entity`, `DTO`, etc.
 * To ensure Spring scans those packages, we specify them in scanBasePackages.
 */
@SpringBootApplication()
public class NextMoveLondonApplication {

  public static void main(String[] args) {
    SpringApplication.run(NextMoveLondonApplication.class, args);
  }

}