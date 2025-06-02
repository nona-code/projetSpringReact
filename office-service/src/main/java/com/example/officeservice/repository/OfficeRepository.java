package com.example.officeservice.repository;

import com.example.officeservice.entity.Office;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OfficeRepository extends JpaRepository<Office, Long> {}
