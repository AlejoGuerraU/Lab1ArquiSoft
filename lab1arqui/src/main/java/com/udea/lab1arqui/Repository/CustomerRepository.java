package com.udea.lab1arqui.Repository;

import com.udea.lab1arqui.Entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional <Customer> findByAccountNumber(String accountNumber);

}
