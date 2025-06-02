package com.example.skillservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class SkillServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(SkillServiceApplication.class, args);
    }
}
