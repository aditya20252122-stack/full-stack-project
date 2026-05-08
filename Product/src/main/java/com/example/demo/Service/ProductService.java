package com.example.demo.Service;

import java.util.List;

import com.example.demo.Entity.Product;


public interface ProductService {
	Product addProd(Product prod);
    List<Product> getAllProducts();
    List<Product> getByName(String name);
    List<Product> getByBrand(String brand);
    List<Product> getProductsInPriceRange(int min, int max);
    Product getProductById(int code);
    Product updateProduct(Product prod);
    void deleteBook(int code);
}
