package com.example.demo.Service;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Product;
import com.example.demo.Repository.ProductRepository;
@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	private ProductRepository prodRepo;
	@Override
	public Product addProd(Product prod) {
		// TODO Auto-generated method stub(POST)
		return prodRepo.save(prod);
	}

	@Override
	public List<Product> getAllProducts() {
		// TODO Auto-generated method stub(GET)
		return prodRepo.findAll();
	}
	
	@Override
	public List<Product> getByName(String name) {
		// Basic validation: if name is blank, don't even hit the DB
		if(name == null || name.trim().isEmpty())
		{
			return Collections.emptyList();
		}
		return prodRepo.findByNameContainingIgnoreCase(name);
	}

	@Override
	public List<Product> getByBrand(String brand) {
		// TODO Auto-generated method stub
		if(brand == null || brand.trim().isEmpty())
		{
			return Collections.emptyList();
		}
		return prodRepo.findByBrandContainingIgnoreCase(brand);
	}
	@Override
	public List<Product> getProductsInPriceRange(int min, int max) {
	    return prodRepo.findByRange(min, max);
	}
	@Override
	public Product getProductById(int code) {
		// TODO Auto-generated method stub(GET)
		return prodRepo.findById(code).orElse(null);
	}

	@Override
	public Product updateProduct(Product prod) {
		// TODO Auto-generated method stub(PUT)
		return prodRepo.save(prod);
	}

	@Override
	public void deleteBook(int code) {
		// TODO Auto-generated method stub(DELETE)
		prodRepo.deleteById(code);		
	}

}
