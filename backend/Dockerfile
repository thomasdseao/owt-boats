# Use an official Maven runtime as a parent image
FROM maven:3.9.4-sapmachine-21 as build

# Set the working directory
WORKDIR /usr/src/app

# Copy the pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build the project
RUN mvn clean package -DskipTests

# Start with a base image containing Java runtime
FROM openjdk:21

# Copy the jar file into the image
COPY --from=build /usr/src/app/target/*.jar /app/app.jar

# Run the jar file
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
