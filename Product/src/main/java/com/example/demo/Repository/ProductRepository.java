package com.example.demo.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.Entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByBrandContainingIgnoreCase(String brand);
    @Query("SELECT p FROM Product p WHERE p.price BETWEEN :minprc AND :maxprc")
    List<Product> findByRange(@Param("minprc") int minprc, @Param("maxprc") int maxprc);
}
