package com.example.departmentservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@FeignClient(name = "employee-service")
public interface EmployeeClient {
    @GetMapping("/employees/by-department")
    List<Object> getEmployeesByDepartment(@RequestParam("departmentId") Long departmentId);
}
