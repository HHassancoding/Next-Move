package org.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Spring Boot application entry point.
 *
 * The project uses top-level packages like `controller`, `service`, `Entity`, `DTO`, etc.
 * To ensure Spring scans those packages, we specify them in scanBasePackages.
 */
@SpringBootApplication(scanBasePackages = {
    "controller",
    "service",
    "DTO",
    "Entity",
    "Mapper",
    "Repositories",
    "data",
    "Config",
    "org.example"
})
@EnableJpaRepositories(basePackages = "Repositories")
@EntityScan(basePackages = "Entity")
public class NextMoveLondonApplication {

  public static void main(String[] args) {
    SpringApplication.run(NextMoveLondonApplication.class, args);
  }

}