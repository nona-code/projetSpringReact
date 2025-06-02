package com.example.departmentservice.controller;

import com.example.departmentservice.client.EmployeeClient;
import com.example.departmentservice.entity.Department;
import com.example.departmentservice.repository.DepartmentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/departments")
public class DepartmentController {
    private final DepartmentRepository repository;
    private final EmployeeClient employeeClient;

    public DepartmentController(DepartmentRepository repository, EmployeeClient employeeClient) {
        this.repository = repository;
        this.employeeClient = employeeClient;
    }

    @GetMapping
    public List<Department> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Department create(@RequestBody Department department) {
        return repository.save(department);
    }

    @GetMapping("/{id}/with-employees")
    public Object getDepartmentWithEmployees(@PathVariable Long id) {
        Department department = repository.findById(id).orElse(null);
        if (department == null) return null;
        List<?> employees = employeeClient.getEmployeesByDepartment(id);
        return new Object() {
            public final Department dept = department;
            public final Object emps = employees;
        };
    }

    @PutMapping("/{id}")
    public ResponseEntity<Department> update(@PathVariable Long id, @RequestBody Department updated) {
        return repository.findById(id)
            .map(dep -> {
                dep.setName(updated.getName());
                repository.save(dep);
                return ResponseEntity.ok(dep);
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
