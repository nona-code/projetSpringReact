package com.example.projectservice.controller;

import com.example.projectservice.client.EmployeeClient;
import com.example.projectservice.entity.Project;
import com.example.projectservice.repository.ProjectRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="http://localhost:3000") // Permet la communication avec le frontend (CORS)
@RestController
@RequestMapping("/projects")
public class ProjectController {
    private final ProjectRepository repository;
    private final EmployeeClient employeeClient;

    public ProjectController(ProjectRepository repository, EmployeeClient employeeClient) {
        this.repository = repository;
        this.employeeClient = employeeClient;
    }

    @GetMapping
    public List<Project> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Project create(@RequestBody Project project) {
        return repository.save(project);
    }

    @GetMapping("/{id}/with-employees")
    public Object getProjectWithEmployees(@PathVariable Long id) {
        Project project = repository.findById(id).orElse(null);
        if (project == null) return null;
        List<?> employees = employeeClient.getEmployeesByProject(id);
        return new Object() {
            public final Project proj = project;
            public final Object emps = employees;
        };
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> update(@PathVariable Long id, @RequestBody Project updated) {
        return repository.findById(id)
            .map(proj -> {
                proj.setName(updated.getName());
                proj.setDescription(updated.getDescription());
                repository.save(proj);
                return ResponseEntity.ok(proj);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
