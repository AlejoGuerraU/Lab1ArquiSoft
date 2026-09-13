package com.udea.lab1arqui.Mapper;

import com.udea.lab1arqui.DTO.TransactionsDTO;
import com.udea.lab1arqui.Entity.Transactions;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TransactionMapper {
 TransactionMapper INSTANCE = Mappers.getMapper(TransactionMapper.class);
 TransactionsDTO toDTO (Transactions transactions);

}
