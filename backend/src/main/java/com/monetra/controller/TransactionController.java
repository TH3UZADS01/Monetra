package com.monetra.controller;

import com.monetra.model.Transaction;
import com.monetra.service.TransactionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/transactions")
@Tag(name = "Transactions", description = "API para gerenciamento de transações financeiras")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    // GET: Listar todas as transações
    @GetMapping
    @Operation(summary = "Listar todas as transações", description = "Retorna uma lista com todas as transações registradas")
    @ApiResponse(responseCode = "200", description = "Lista de transações retornada com sucesso")
    public ResponseEntity<List<Transaction>> getAll() {
        List<Transaction> transactions = transactionService.findAll();
        return ResponseEntity.ok(transactions);
    }

    // GET: Obter transação por ID
    @GetMapping("/{id}")
    @Operation(summary = "Obter transação por ID", description = "Retorna os detalhes de uma transação específica")
    @ApiResponse(responseCode = "200", description = "Transação encontrada")
    @ApiResponse(responseCode = "404", description = "Transação não encontrada")
    public ResponseEntity<Transaction> getById(@PathVariable Long id) {
        Optional<Transaction> transaction = transactionService.findById(id);
        return transaction.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST: Criar nova transação
    @PostMapping
    @Operation(summary = "Criar nova transação", description = "Cria uma nova transação financeira")
    @ApiResponse(responseCode = "201", description = "Transação criada com sucesso")
    @ApiResponse(responseCode = "400", description = "Dados inválidos")
    public ResponseEntity<?> create(@RequestBody Transaction transaction) {
        try {
            Transaction created = transactionService.create(transaction);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }

    // PUT: Atualizar transação
    @PutMapping("/{id}")
    @Operation(summary = "Atualizar transação", description = "Atualiza os dados de uma transação existente")
    @ApiResponse(responseCode = "200", description = "Transação atualizada com sucesso")
    @ApiResponse(responseCode = "404", description = "Transação não encontrada")
    @ApiResponse(responseCode = "400", description = "Dados inválidos")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Transaction transactionDetails) {
        try {
            Transaction updated = transactionService.update(id, transactionDetails);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }

    // DELETE: Deletar transação
    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar transação", description = "Remove uma transação do sistema")
    @ApiResponse(responseCode = "204", description = "Transação deletada com sucesso")
    @ApiResponse(responseCode = "404", description = "Transação não encontrada")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            transactionService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }

    // GET: Obter resumo financeiro
    @GetMapping("/summary")
    @Operation(summary = "Obter resumo financeiro", description = "Retorna o total de receitas, despesas e saldo atual")
    @ApiResponse(responseCode = "200", description = "Resumo financeiro retornado com sucesso")
    public ResponseEntity<Map<String, Object>> getSummary() {
        return ResponseEntity.ok(transactionService.getSummary());
    }

    // GET: Filtrar transações por categoria
    @GetMapping("/category/{category}")
    @Operation(summary = "Filtrar por categoria", description = "Retorna transações de uma categoria específica")
    @ApiResponse(responseCode = "200", description = "Transações encontradas")
    public ResponseEntity<List<Transaction>> getByCategory(@PathVariable String category) {
        return ResponseEntity.ok(transactionService.findByCategory(category));
    }

    // GET: Filtrar transações por tipo
    @GetMapping("/type/{type}")
    @Operation(summary = "Filtrar por tipo", description = "Retorna transações de tipo RECEITA ou DESPESA")
    @ApiResponse(responseCode = "200", description = "Transações encontradas")
    public ResponseEntity<List<Transaction>> getByType(@PathVariable String type) {
        return ResponseEntity.ok(transactionService.findByType(type));
    }

    // GET: Health check
    @GetMapping("/health")
    @Operation(summary = "Health check", description = "Verifica se a API está funcionando")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of("status", "ok"));
    }
}
