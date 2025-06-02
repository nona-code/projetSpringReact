package com.example.officeservice.controller;

import com.example.officeservice.entity.Office;
import com.example.officeservice.repository.OfficeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/offices")
public class OfficeController {
    private final OfficeRepository repository;
    public OfficeController(OfficeRepository repository) { this.repository = repository; }

    @GetMapping
    public List<Office> getAll() { return repository.findAll(); }

    @PostMapping
    public Office create(@RequestBody Office office) { return repository.save(office); }

    @PutMapping("/{id}")
    public ResponseEntity<Office> update(@PathVariable Long id, @RequestBody Office updated) {
        return repository.findById(id)
            .map(office -> {
                office.setLocation(updated.getLocation());
                repository.save(office);
                return ResponseEntity.ok(office);
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
