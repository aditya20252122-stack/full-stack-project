package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entity.Product;
import com.example.demo.Service.ProductService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api1/prod")
public class ProductController {
	@Autowired
	private ProductService prodService;
	
	@PostMapping("/add")
	public Product createProd(@RequestBody Product prod)
	{
		return prodService.addProd(prod);
	}
	
	@GetMapping("/all")
	public List<Product> fetchAll()
	{
		return prodService.getAllProducts();
	}
	@GetMapping("/name/{name}")
	public List<Product> fetchByName(@PathVariable("name")String name)
	{
		return prodService.getByName(name);
	}
	
	@GetMapping("/brand/{brand}")
    public List<Product> fetchByBrand(@PathVariable("brand") String brand) {
        return prodService.getByBrand(brand);
    }
	
	@GetMapping("/price-range/{min}/{max}")
	public List<Product> fetchByPrice(@PathVariable int min, @PathVariable int max) {
	    return prodService.getProductsInPriceRange(min, max);
	}
	@GetMapping("/{id}")
	public Product fetchById(@PathVariable("id") int code)
	{
		return prodService.getProductById(code);
	}
	
	@PutMapping("/update")
	public Product update(@RequestBody Product prod)
	{
		return prodService.updateProduct(prod);
	}
	
	@DeleteMapping("/delete/{id}")
	public String remove(@PathVariable("id") int code)
	{
		prodService.deleteBook(code);
		return "Product deleted sucessfully";
	}
}
