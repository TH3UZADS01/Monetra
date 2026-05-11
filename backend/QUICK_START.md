# 🚀 Quick Start - Monetra Backend

## ⚡ Iniciar em 30 Segundos

### 1. Entrar no diretório
```bash
cd /workspaces/monetra-backend
```

### 2. Executar a aplicação
```bash
# Opção 1: Maven (recompila e roda)
mvn spring-boot:run

# Opção 2: Jar direto
java -jar target/monetra-backend-1.0.0.jar

# Opção 3: Script shell
./run.sh
```

### 3. Acessar a API
- **Swagger UI:** http://localhost:8080/swagger-ui.html
- **API Base:** http://localhost:8080/api/transactions
- **Health Check:** http://localhost:8080/api/transactions/health

---

## 📝 Primeiras Requisições

### ✅ Listar Transações
```bash
curl http://localhost:8080/api/transactions
```

### ➕ Criar Transação
```bash
curl -X POST http://localhost:8080/api/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Supermercado",
    "category": "Alimentação",
    "amount": 120.00,
    "type": "DESPESA"
  }'
```

### 💰 Ver Resumo Financeiro
```bash
curl http://localhost:8080/api/transactions/summary
```

### 🔄 Filtrar por Tipo
```bash
curl http://localhost:8080/api/transactions/type/RECEITA
```

---

## 🛠️ Dependências Instaladas

✅ Spring Boot 3.3.0  
✅ OpenAPI/Swagger 2.5.0  
✅ Java 21  
✅ Maven  

---

## 📚 Arquivos Importantes

| Arquivo | Descrição |
|---------|-----------|
| `pom.xml` | Dependências e versões |
| `README.md` | Documentação completa |
| `DESENVOLVIMENTO.md` | Guia de evolução |
| `EXEMPLOS_API.rest` | Exemplos de requisições |
| `application.properties` | Configurações (porta, swagger) |

---

## 🎯 Endpoints Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/transactions` | Listar todas |
| GET | `/api/transactions/{id}` | Obter por ID |
| POST | `/api/transactions` | Criar nova |
| PUT | `/api/transactions/{id}` | Atualizar |
| DELETE | `/api/transactions/{id}` | Deletar |
| GET | `/api/transactions/summary` | Resumo financeiro |
| GET | `/api/transactions/category/{cat}` | Filtrar categoria |
| GET | `/api/transactions/type/{type}` | Filtrar tipo |
| GET | `/api/transactions/health` | Health check |

---

## 🔧 Configurações Rápidas

### Mudar Porta
Editar `application.properties`:
```properties
server.port=9090
```

### Habilitar Debug
Editar `application.properties`:
```properties
logging.level.com.monetra=DEBUG
```

### CORS - Origem Específica
Editar `CorsConfig.java`:
```java
.allowedOrigins("http://localhost:3000") // seu frontend
```

---

## 🐛 Troubleshooting

### Erro: Porta 8080 já em uso
```bash
# Linux/Mac: matar processo
lsof -ti:8080 | xargs kill -9

# Ou alterar porta em application.properties
server.port=8081
```

### Erro: Java não encontrado
```bash
# Verificar versão
java -version

# Deve ser Java 21 ou superior
```

### Erro: Maven não encontrado
```bash
# Instalar Maven
brew install maven  # Mac
sudo apt install maven  # Ubuntu/Debian
```

---

## ✨ Próximos Passos

1. ✅ Backend rodando
2. 📱 Conectar com frontend
3. 🗄️ Migrar para banco de dados
4. 🔐 Adicionar autenticação JWT
5. 📊 Criar endpoints de relatórios

---

## 📞 Suporte

Ver `README.md` para documentação completa.  
Ver `DESENVOLVIMENTO.md` para guia de expansão.

---

**🎉 Backend pronto para produção!**
