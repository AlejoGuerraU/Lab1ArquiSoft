FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn -B clean package -DskipTests
 
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
# Copia el JAR de la etapa 'build' (nombre fijado con <finalName> en el pom.xml)
COPY --from=build /app/target/lab1arqui.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]