package com.example.demo.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="PRODUCTS")
public class Product {
	@Id
	int code;
	String name, brand;
	double price;
	public Product() {
		super();
	}
	public Product(int code, String name, String brand, double price) {
		super();
		this.code = code;
		this.name = name;
		this.brand = brand;
		this.price = price;
	}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	@Override
	public String toString() {
		return "Product [code=" + code + ", name=" + name + ", brand=" + brand + ", price=" + price + "]";
	}
	
	
}
