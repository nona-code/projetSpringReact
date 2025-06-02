package com.example.roleservice.controller;

import com.example.roleservice.entity.Role;
import com.example.roleservice.repository.RoleRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/roles")
public class RoleController {
    private final RoleRepository repository;
    public RoleController(RoleRepository repository) { this.repository = repository; }

    @GetMapping
    public List<Role> getAll() { return repository.findAll(); }

    @PostMapping
    public Role create(@RequestBody Role role) { return repository.save(role); }

    @PutMapping("/{id}")
    public ResponseEntity<Role> update(@PathVariable Long id, @RequestBody Role updated) {
        return repository.findById(id)
            .map(role -> {
                role.setName(updated.getName());
                repository.save(role);
                return ResponseEntity.ok(role);
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
