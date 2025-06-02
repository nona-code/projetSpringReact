package com.example.skillservice.controller;

import com.example.skillservice.entity.Skill;
import com.example.skillservice.repository.SkillRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/skills")
public class SkillController {
    private final SkillRepository repository;
    public SkillController(SkillRepository repository) { this.repository = repository; }

    @GetMapping
    public List<Skill> getAll() { return repository.findAll(); }

    @PostMapping
    public Skill create(@RequestBody Skill skill) { return repository.save(skill); }

    @PutMapping("/{id}")
    public ResponseEntity<Skill> update(@PathVariable Long id, @RequestBody Skill updated) {
        return repository.findById(id)
            .map(skill -> {
                skill.setName(updated.getName());
                repository.save(skill);
                return ResponseEntity.ok(skill);
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
