package com.example.employeeservice.controller;

import com.example.employeeservice.client.DepartmentClient;
import com.example.employeeservice.client.ProjectClient;
import com.example.employeeservice.entity.Employee;
import com.example.employeeservice.repository.EmployeeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/employees")
public class EmployeeController {
    private final EmployeeRepository repository;
    private final DepartmentClient departmentClient;
    private final ProjectClient projectClient;

    @Autowired
    private EmployeeRepository employeeRepository;

    public EmployeeController(EmployeeRepository repository, DepartmentClient departmentClient, ProjectClient projectClient) {
        this.repository = repository;
        this.departmentClient = departmentClient;
        this.projectClient = projectClient;
    }

    @GetMapping
    public List<Employee> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public Employee create(@RequestBody Employee employee) {
        return repository.save(employee);
    }

    @GetMapping("/{id}/with-department")
    public Object getEmployeeWithDepartment(@PathVariable Long id) {
        Employee employee = repository.findById(id).orElse(null);
        if (employee == null) return null;
        Object department = departmentClient.getDepartmentById(employee.getDepartmentId());
        return new Object() {
            public final Employee emp = employee;
            public final Object dept = department;
        };
    }

    @GetMapping("/{id}/with-project")
    public Object getEmployeeWithProject(@PathVariable Long id) {
        Employee employee = repository.findById(id).orElse(null);
        if (employee == null) return null;
        // Suppose employee has a projectId field (add if needed)
        Object project = projectClient.getProjectById(/* employee.getProjectId() */ 1L);
        return new Object() {
            public final Employee emp = employee;
            public final Object proj = project;
        };
    }

    @GetMapping("/by-project")
    public List<Employee> getByProject(@RequestParam Long projectId) {
        return repository.findAll().stream()
            .filter(e -> projectId.equals(e.getProjectId()))
            .toList();
    }

    @GetMapping("/by-department")
    public List<Employee> getByDepartment(@RequestParam Long departmentId) {
        return repository.findAll().stream()
            .filter(e -> departmentId.equals(e.getDepartmentId()))
            .toList();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> update(@PathVariable Long id, @RequestBody Employee updated) {
        return repository.findById(id)
            .map(emp -> {
                emp.setName(updated.getName());
                emp.setEmail(updated.getEmail());
                emp.setDepartmentId(updated.getDepartmentId());
                emp.setProjectId(updated.getProjectId());
                repository.save(emp);
                return ResponseEntity.ok(emp);
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

    @PostMapping("/register")
    public Employee register(@RequestBody Employee employee) {
        // TODO: ajouter vérification email unique et hash du mot de passe
        return employeeRepository.save(employee);
    }

    @PostMapping("/login")
    public Employee login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        Employee employee = employeeRepository.findByEmail(email);
        if (employee != null && employee.getPassword().equals(password)) {
            return employee;
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Email ou mot de passe incorrect");
    }

    @GetMapping("/{id}/profile")
    public Employee getProfile(@PathVariable Long id) {
        return employeeRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Employé non trouvé"));
    }
}
