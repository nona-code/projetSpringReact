package com.example.projectservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @GetMapping("/")
    public String home() {
        // Utilise une chaîne classique au lieu d'un text block (Java 8 compatible)
        return "<html>" +
                "<body>" +
                "<h2>Project Service is running!</h2>" +
                "<ul>" +
                "<li><a href=\"/projects\">/projects</a> (GET, POST)</li>" +
                "<li><a href=\"/projects/{id}/with-employees\">/projects/{id}/with-employees</a> (GET)</li>" +
                "<li><a href=\"/projects/{id}\">/projects/{id}</a> (PUT, DELETE)</li>" +
                "</ul>" +
                "</body>" +
                "</html>";
    }
}
