package com.example.employeeservice.entity;

import javax.persistence.*;

@Entity
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "department_id")
    private Long departmentId;

    @Column(name = "project_id")
    private Long projectId;

    public Employee() {
        super();
        // Constructeur sans argument requis par JPA
    }

    public Employee(String name, String email, String password, Long departmentId, Long projectId) {
        super();
        this.name = name;
        this.email = email;
        this.password = password;
        this.departmentId = departmentId;
        this.projectId = projectId;
    } public Employee(Long id, String name, String email, String password, Long departmentId, Long projectId) {
        super();
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.departmentId = departmentId;
        this.projectId = projectId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }
}
