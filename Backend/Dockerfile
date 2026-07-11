FROM eclipse-temurin:23-jre-alpine

WORKDIR /app

COPY target/NextMove-1.0-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]