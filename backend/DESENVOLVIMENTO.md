# Guia de Desenvolvimento - Monetra Backend

## 📖 Visão Geral

Este documento descreve como expandir e manter o backend Monetra.

## 🏗️ Arquitetura Atual

```
Controller (HTTP endpoints)
    ↓
Service (lógica de negócio)
    ↓
Model (entidades)
    ↓
ArrayList (dados em memória)
```

## 🔄 Fluxo de uma Requisição

1. **Cliente** faz requisição para `/api/transactions`
2. **Controller** recebe a requisição
3. **Service** processa a lógica
4. **ArrayList** fornece ou armazena dados
5. **Response** retorna JSON para o cliente

## 📝 Como Adicionar Novo Endpoint

### 1. Adicionar método no Service

```java
// TransactionService.java
public List<Transaction> findByMonth(int month, int year) {
    return transactions.stream()
            .filter(t -> t.getDate().getMonthValue() == month && 
                         t.getDate().getYear() == year)
            .toList();
}
```

### 2. Adicionar endpoint no Controller

```java
// TransactionController.java
@GetMapping("/month/{month}/year/{year}")
@Operation(summary = "Filtrar por mês")
public ResponseEntity<List<Transaction>> getByMonth(
        @PathVariable int month, 
        @PathVariable int year) {
    return ResponseEntity.ok(transactionService.findByMonth(month, year));
}
```

## 🔄 Migração para Banco de Dados

Quando decidir migrar para um banco de dados, siga estes passos:

### 1. Adicionar Dependências ao pom.xml

```xml
<!-- Spring Data JPA -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- Driver do Banco (ex: PostgreSQL) -->
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

### 2. Converter Model em Entity

```java
@Entity
@Table(name = "transactions")
public class Transaction {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String description;
    
    // ... resto do código
}
```

### 3. Criar Repository (substitui Service com ArrayList)

```java
@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByCategory(String category);
    List<Transaction> findByType(String type);
}
```

### 4. Atualizar Service

```java
@Service
public class TransactionService {
    
    @Autowired
    private TransactionRepository repository;
    
    public Transaction create(Transaction transaction) {
        // Validações...
        return repository.save(transaction);
    }
    
    public List<Transaction> findAll() {
        return repository.findAll();
    }
    
    // ... resto dos métodos
}
```

### 5. Configurar Banco no application.properties

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/monetra
spring.datasource.username=postgres
spring.datasource.password=senha
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

## 🔐 Adicionar Autenticação (Futuro)

### 1. Adicionar Dependência

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.12.3</version>
</dependency>
```

### 2. Criar User Model

```java
@Entity
public class User {
    @Id
    @GeneratedValue
    private Long id;
    
    private String email;
    private String password;
    
    // Getters e Setters
}
```

### 3. Criar JWT Util

```java
@Component
public class JwtUtil {
    private String secretKey = "sua-chave-secreta";
    
    public String generateToken(String email) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 3600000))
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }
    
    public String extractEmail(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }
}
```

## 🧪 Adicionar Testes (Futuro)

### 1. Dependência

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

### 2. Teste Simples

```java
@SpringBootTest
public class TransactionServiceTest {
    
    @Autowired
    private TransactionService service;
    
    @Test
    public void testCreate() {
        Transaction t = new Transaction("Teste", "Test", 100.0, "RECEITA");
        Transaction saved = service.create(t);
        
        assertNotNull(saved.getId());
        assertEquals("Teste", saved.getDescription());
    }
}
```

## 🚀 Deploy (Futuro)

### Docker

1. Criar `Dockerfile`:

```dockerfile
FROM openjdk:21-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
```

2. Build e Run:

```bash
docker build -t monetra-backend .
docker run -p 8080:8080 monetra-backend
```

### Docker Compose com PostgreSQL

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - postgres
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/monetra
      SPRING_DATASOURCE_USERNAME: postgres
      SPRING_DATASOURCE_PASSWORD: password
  
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: monetra
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 📊 Estrutura Futura Recomendada

Quando o projeto crescer, considere esta estrutura:

```
src/
├── main/java/com/monetra/
│   ├── MonetaBackendApplication.java
│   ├── config/
│   │   ├── CorsConfig.java
│   │   ├── SecurityConfig.java
│   │   ├── JwtConfig.java
│   │   └── SwaggerConfig.java
│   ├── controller/
│   │   ├── TransactionController.java
│   │   ├── UserController.java
│   │   └── ReportController.java
│   ├── service/
│   │   ├── TransactionService.java
│   │   ├── UserService.java
│   │   └── ReportService.java
│   ├── repository/
│   │   ├── TransactionRepository.java
│   │   └── UserRepository.java
│   ├── model/
│   │   ├── Transaction.java
│   │   └── User.java
│   ├── dto/
│   │   ├── TransactionDTO.java
│   │   └── UserDTO.java
│   ├── exception/
│   │   ├── ResourceNotFoundException.java
│   │   └── GlobalExceptionHandler.java
│   └── util/
│       ├── JwtUtil.java
│       └── ValidationUtil.java
├── test/java/com/monetra/
│   ├── service/
│   ├── controller/
│   └── repository/
└── resources/
    ├── application.properties
    ├── application-dev.properties
    ├── application-prod.properties
    └── db/migration/
```

## 📚 Referências Úteis

- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [Spring Security](https://spring.io/projects/spring-security)
- [OpenAPI/Swagger](https://swagger.io/specification/)
- [JWT](https://jwt.io/)

## 💡 Boas Práticas

1. **Validação:** Sempre validar entrada do usuário
2. **Tratamento de Erro:** Usar `@ControllerAdvice` para exceções globais
3. **Logging:** Usar SLF4J para logs estruturados
4. **CORS:** Manter configuração segura em produção
5. **Segurança:** Nunca expor informações sensíveis
6. **Performance:** Usar índices no banco quando migrar
7. **Documentação:** Manter Swagger/OpenAPI atualizado
8. **Testes:** Escrever testes desde o início

---

**Desenvolvido com ❤️ usando Spring Boot**
