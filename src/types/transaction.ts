// FUNÇÃO: Definir os tipos de dados usados no app (TypeScript)

// TIPO: TransactionType
// Define se a transação é receita ou despesa
export type TransactionType = "income" | "expense";
// "income"  → Receita (dinheiro que entra)
// "expense" → Despesa (dinheiro que sai)

// TIPO: Category
// Define as categorias disponíveis para as transações
export type Category = 
  | "Alimentação"  // Compras de mercado, restaurantes
  | "Transporte"   // Uber, ônibus, metrô, gasolina
  | "Moradia"      // Aluguel, condomínio, contas de casa
  | "Lazer"        // Cinema, Netflix, shows, hobbies
  | "Outros";      // Qualquer outra despesa não categorizada

// INTERFACE: Transaction
// Estrutura completa de uma transação (gasto ou receita)
export interface Transaction {
  id: string;          // Identificador único da transação (ex: "abc123")
  description: string; // Descrição (ex: "Supermercado", "Salário")
  amount: number;      // Valor (ex: 85.40, 7450.00)
  type: TransactionType; // Tipo: "income" ou "expense"
  category: Category;   // Categoria (ex: "Alimentação")
  date: Date;          // Data da transação (ex: 05/05/2026)
}

// INTERFACE: MonthlySummary
// Resumo financeiro do mês
export interface MonthlySummary {
  totalIncome: number;                           // Total de receitas no mês
  totalExpense: number;                          // Total de despesas no mês
  balance: number;                               // Saldo (receitas - despesas)
  categoryBreakdown: Record<Category, number>;   // Quanto gastou por categoria
  // Record<Category, number> significa: um objeto onde:
  // - A chave é uma categoria (Alimentação, Transporte, etc)
  // - O valor é um número (o total gasto naquela categoria)
}