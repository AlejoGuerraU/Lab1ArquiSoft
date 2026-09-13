package com.udea.lab1arqui.Repository;

import com.udea.lab1arqui.Entity.Transactions;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transactions, Long> {
   List<Transactions> findBySenderAccountNumberOrReceiverAccountNumber(String senderAccountNumber, String reciverAccountNumber);
}
