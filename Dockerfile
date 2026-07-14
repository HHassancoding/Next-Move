# Use a Maven image that runs JDK 23 to match project's <java.version> (23)
FROM maven:3.9-eclipse-temurin-23 AS build

WORKDIR /app

COPY pom.xml .
COPY .mvn .mvn
COPY Backend Backend

RUN mvn clean package -DskipTests

FROM eclipse-temurin:23-jre-alpine

WORKDIR /app

COPY --from=build /app/target/NextMove-1.0-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]