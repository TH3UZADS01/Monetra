package com.monetra.model;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;

@Schema(description = "Modelo de Transação Financeira")
public class Transaction {

    @Schema(description = "ID único da transação", example = "1")
    private Long id;

    @Schema(description = "Descrição da transação", example = "Compra no supermercado")
    private String description;

    @Schema(description = "Categoria da transação", example = "Alimentação")
    private String category;

    @Schema(description = "Valor da transação", example = "150.50")
    private Double amount;

    @Schema(description = "Tipo de transação", example = "DESPESA", allowableValues = {"RECEITA", "DESPESA"})
    private String type; // RECEITA ou DESPESA

    @Schema(description = "Data e hora da transação")
    private LocalDateTime date;

    // Construtores
    public Transaction() {
    }

    public Transaction(String description, String category, Double amount, String type) {
        this.description = description;
        this.category = category;
        this.amount = amount;
        this.type = type;
        this.date = LocalDateTime.now();
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }
}
