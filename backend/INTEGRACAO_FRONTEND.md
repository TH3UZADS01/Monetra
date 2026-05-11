# 🔌 Integração com Frontend - Monetra Backend

Guia rápido para conectar seu frontend React/Vue/Next.js com a API do Monetra Backend.

## 🌐 Base URL

```
http://localhost:8080/api/transactions
```

## 📋 Exemplos de Integração

### React - Exemplo com Fetch

```javascript
// src/services/api.js
const API_URL = 'http://localhost:8080/api/transactions';

export const apiService = {
  // Listar todas
  async getAll() {
    const res = await fetch(API_URL);
    return res.json();
  },

  // Obter por ID
  async getById(id) {
    const res = await fetch(`${API_URL}/${id}`);
    return res.json();
  },

  // Criar
  async create(transaction) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction)
    });
    return res.json();
  },

  // Atualizar
  async update(id, transaction) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction)
    });
    return res.json();
  },

  // Deletar
  async delete(id) {
    return fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  },

  // Resumo
  async getSummary() {
    const res = await fetch(`${API_URL}/summary`);
    return res.json();
  },

  // Filtrar por categoria
  async getByCategory(category) {
    const res = await fetch(`${API_URL}/category/${category}`);
    return res.json();
  },

  // Filtrar por tipo
  async getByType(type) {
    const res = await fetch(`${API_URL}/type/${type}`);
    return res.json();
  }
};
```

### React - Uso em Componente

```javascript
import { useEffect, useState } from 'react';
import { apiService } from './services/api';

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getAll().then(data => {
      setTransactions(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Transações</h1>
      <ul>
        {transactions.map(t => (
          <li key={t.id}>
            {t.description} - R$ {t.amount} ({t.type})
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### React - Criar Transação

```javascript
import { useState } from 'react';
import { apiService } from './services/api';

export default function AddTransaction() {
  const [form, setForm] = useState({
    description: '',
    category: '',
    amount: '',
    type: 'DESPESA'
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transaction = {
      ...form,
      amount: parseFloat(form.amount)
    };
    
    try {
      const result = await apiService.create(transaction);
      console.log('Criada:', result);
      setForm({ description: '', category: '', amount: '', type: 'DESPESA' });
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="description"
        placeholder="Descrição"
        value={form.description}
        onChange={handleChange}
        required
      />
      <input
        name="category"
        placeholder="Categoria"
        value={form.category}
        onChange={handleChange}
        required
      />
      <input
        name="amount"
        type="number"
        placeholder="Valor"
        value={form.amount}
        onChange={handleChange}
        step="0.01"
        required
      />
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="RECEITA">Receita</option>
        <option value="DESPESA">Despesa</option>
      </select>
      <button type="submit">Adicionar</button>
    </form>
  );
}
```

---

### Next.js - Com Fetch API

```javascript
// lib/api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/transactions';

export async function getTransactions() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Erro ao buscar');
  return res.json();
}

export async function createTransaction(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Erro ao criar');
  return res.json();
}

export async function getSummary() {
  const res = await fetch(`${API_URL}/summary`);
  if (!res.ok) throw new Error('Erro ao buscar resumo');
  return res.json();
}
```

```javascript
// pages/transactions.js (Next.js)
import { useEffect, useState } from 'react';
import { getTransactions, getSummary } from '../lib/api';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function load() {
      const txs = await getTransactions();
      const sum = await getSummary();
      setTransactions(txs);
      setSummary(sum);
    }
    load();
  }, []);

  return (
    <div>
      <h1>Monetra</h1>
      {summary && (
        <div>
          <p>Receitas: R$ {summary.totalReceita}</p>
          <p>Despesas: R$ {summary.totalDespesa}</p>
          <p>Saldo: R$ {summary.saldo}</p>
        </div>
      )}
      <ul>
        {transactions.map(t => (
          <li key={t.id}>{t.description} - R$ {t.amount}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

### Vue 3 - Composable

```javascript
// composables/useApi.js
import { ref } from 'vue';

const API_URL = 'http://localhost:8080/api/transactions';

export function useApi() {
  const transactions = ref([]);
  const loading = ref(false);

  async function getAll() {
    loading.value = true;
    const response = await fetch(API_URL);
    transactions.value = await response.json();
    loading.value = false;
  }

  async function create(transaction) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction)
    });
    return response.json();
  }

  async function deleteById(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  }

  return { transactions, loading, getAll, create, deleteById };
}
```

```vue
<!-- components/TransactionList.vue -->
<template>
  <div>
    <h1>Transações</h1>
    <div v-if="loading">Carregando...</div>
    <ul v-else>
      <li v-for="t in transactions" :key="t.id">
        {{ t.description }} - R$ {{ t.amount }} ({{ t.type }})
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useApi } from '../composables/useApi';

const { transactions, loading, getAll } = useApi();

onMounted(() => {
  getAll();
});
</script>
```

---

### Axios (TypeScript)

```typescript
// services/api.ts
import axios from 'axios';

interface Transaction {
  id?: number;
  description: string;
  category: string;
  amount: number;
  type: 'RECEITA' | 'DESPESA';
  date?: string;
}

const api = axios.create({
  baseURL: 'http://localhost:8080/api/transactions'
});

export const TransactionService = {
  getAll(): Promise<Transaction[]> {
    return api.get('/').then(res => res.data);
  },

  getById(id: number): Promise<Transaction> {
    return api.get(`/${id}`).then(res => res.data);
  },

  create(transaction: Transaction): Promise<Transaction> {
    return api.post('/', transaction).then(res => res.data);
  },

  update(id: number, transaction: Partial<Transaction>): Promise<Transaction> {
    return api.put(`/${id}`, transaction).then(res => res.data);
  },

  delete(id: number): Promise<void> {
    return api.delete(`/${id}`);
  },

  getSummary(): Promise<{ totalReceita: number; totalDespesa: number; saldo: number }> {
    return api.get('/summary').then(res => res.data);
  }
};
```

---

## 🔗 CORS - Configuração por Origem

Se precisar restringir CORS para apenas seu frontend:

**Editar `src/main/java/com/monetra/config/CorsConfig.java`:**

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                    "http://localhost:3000",      // React local
                    "http://localhost:3001",      // Vue local
                    "http://localhost:5173",      // Vite local
                    "https://seu-dominio.com"     // Produção
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .maxAge(3600);
    }
}
```

---

## 📦 Environment Variables

### `.env.local` (Frontend)

```
REACT_APP_API_URL=http://localhost:8080/api/transactions
NEXT_PUBLIC_API_URL=http://localhost:8080/api/transactions
VUE_APP_API_URL=http://localhost:8080/api/transactions
```

---

## ✅ Checklist de Integração

- [ ] Backend rodando em http://localhost:8080
- [ ] CORS configurado corretamente
- [ ] Endpoints testados com cURL/Postman
- [ ] API importada no projeto frontend
- [ ] Componentes conectados à API
- [ ] Testes de CRUD funcionando
- [ ] Mensagens de erro tratadas
- [ ] Loading states implementados
- [ ] Cache/State management (se necessário)
- [ ] Documentação no Swagger acessível

---

## 🐛 Debugging

### Ver Requisições
```javascript
// Adicionar em api.js
const response = await fetch(URL);
console.log('Request:', URL);
console.log('Response:', response);
```

### Testar Endpoint
```bash
curl -v http://localhost:8080/api/transactions
```

### Ver Logs do Backend
Mostrados no terminal onde `mvn spring-boot:run` foi executado.

---

## 🚀 Deploy

Quando pronto para produção:

1. **Backend:** Deploy em servidor/cloud (AWS, Heroku, etc)
2. **Frontend:** Atualizar `API_URL` para produção
3. **CORS:** Permitir apenas domínios de produção
4. **HTTPS:** Usar certificados SSL
5. **Variáveis de Ambiente:** Não hardcode URLs

---

**Integração concluída! 🎉**
