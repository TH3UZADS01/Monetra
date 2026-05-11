package com.monetra.service;

import com.monetra.model.Transaction;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TransactionService {

    // Simulando um banco de dados em memória
    private final List<Transaction> transactions = new ArrayList<>();
    private Long idCounter = 1L;

    // Inicializar com dados de exemplo
    public TransactionService() {
        transactions.add(new Transaction("Salário", "Renda", 5000.0, "RECEITA"));
        transactions.add(new Transaction("Almoço", "Alimentação", 45.50, "DESPESA"));
        transactions.add(new Transaction("Netflix", "Entretenimento", 49.90, "DESPESA"));
        idCounter = 4L;

        // Definir IDs nos dados iniciais
        for (long i = 0; i < transactions.size(); i++) {
            transactions.get((int)i).setId(i + 1);
        }
    }

    // CREATE: Criar nova transação
    public Transaction create(Transaction transaction) {
        if (transaction.getDescription() == null || transaction.getDescription().trim().isEmpty()) {
            throw new IllegalArgumentException("Descrição não pode estar vazia");
        }
        if (transaction.getAmount() == null || transaction.getAmount() <= 0) {
            throw new IllegalArgumentException("Valor deve ser maior que zero");
        }
        if (!"RECEITA".equals(transaction.getType()) && !"DESPESA".equals(transaction.getType())) {
            throw new IllegalArgumentException("Tipo deve ser RECEITA ou DESPESA");
        }

        transaction.setId(idCounter++);
        transactions.add(transaction);
        return transaction;
    }

    // READ: Obter todas as transações
    public List<Transaction> findAll() {
        return new ArrayList<>(transactions);
    }

    // READ: Obter transação por ID
    public Optional<Transaction> findById(Long id) {
        return transactions.stream().filter(t -> t.getId().equals(id)).findFirst();
    }

    // UPDATE: Atualizar transação
    public Transaction update(Long id, Transaction transactionDetails) {
        Optional<Transaction> optionalTransaction = findById(id);
        if (optionalTransaction.isPresent()) {
            Transaction transaction = optionalTransaction.get();
            if (transactionDetails.getDescription() != null && !transactionDetails.getDescription().trim().isEmpty()) {
                transaction.setDescription(transactionDetails.getDescription());
            }
            if (transactionDetails.getCategory() != null && !transactionDetails.getCategory().trim().isEmpty()) {
                transaction.setCategory(transactionDetails.getCategory());
            }
            if (transactionDetails.getAmount() != null && transactionDetails.getAmount() > 0) {
                transaction.setAmount(transactionDetails.getAmount());
            }
            if (transactionDetails.getType() != null && 
                ("RECEITA".equals(transactionDetails.getType()) || "DESPESA".equals(transactionDetails.getType()))) {
                transaction.setType(transactionDetails.getType());
            }
            return transaction;
        }
        throw new IllegalArgumentException("Transação não encontrada com ID: " + id);
    }

    // DELETE: Deletar transação
    public void delete(Long id) {
        boolean removed = transactions.removeIf(t -> t.getId().equals(id));
        if (!removed) {
            throw new IllegalArgumentException("Transação não encontrada com ID: " + id);
        }
    }

    // Obter resumo financeiro
    public Map<String, Object> getSummary() {
        double totalReceita = transactions.stream()
                .filter(t -> "RECEITA".equals(t.getType()))
                .mapToDouble(Transaction::getAmount)
                .sum();

        double totalDespesa = transactions.stream()
                .filter(t -> "DESPESA".equals(t.getType()))
                .mapToDouble(Transaction::getAmount)
                .sum();

        java.util.Map<String, Object> summary = new java.util.HashMap<>();
        summary.put("totalReceita", totalReceita);
        summary.put("totalDespesa", totalDespesa);
        summary.put("saldo", totalReceita - totalDespesa);
        return summary;
    }

    // Buscar transações por categoria
    public List<Transaction> findByCategory(String category) {
        return transactions.stream()
                .filter(t -> t.getCategory().equalsIgnoreCase(category))
                .toList();
    }

    // Buscar transações por tipo
    public List<Transaction> findByType(String type) {
        return transactions.stream()
                .filter(t -> t.getType().equals(type))
                .toList();
    }
}
