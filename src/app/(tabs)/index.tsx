// FUNÇÃO: Tela principal (Dashboard) que mostra resumo financeiro

// Importações 
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import { colors, spacing, typography } from "@/styles/theme";
import { Transaction, Category } from "@/types/transaction";

// DADOS DE EXEMPLO (enquanto não conecta com banco de dados)
// Lista de transações para testar a tela
const mockTransactions: Transaction[] = [
  { id: "1", description: "Supermercado", amount: 85.40, type: "expense", category: "Alimentação", date: new Date() },
  { id: "2", description: "Uber", amount: 27.80, type: "expense", category: "Transporte", date: new Date() },
  { id: "3", description: "Salário", amount: 7450.00, type: "income", category: "Outros", date: new Date() },
  { id: "4", description: "Netflix", amount: 45.90, type: "expense", category: "Lazer", date: new Date() },
];

// Porcentagem de gastos por categoria (exemplo)
const categoryPercentages: Record<Category, number> = {
  "Alimentação": 40,
  "Transporte": 25,
  "Moradia": 20,
  "Lazer": 10,
  "Outros": 5,
};

export default function Dashboard() {
  // Guarda as transações no estado do React
  const [transactions] = useState(mockTransactions);
  
  // CALCULA RECEITAS (soma todos os valores do tipo "income")
  const totalIncome = transactions
    .filter(t => t.type === "income")  // Pega só as receitas
    .reduce((sum, t) => sum + t.amount, 0); // Soma tudo
  
  // CALCULA DESPESAS (soma todos os valores do tipo "expense")
  const totalExpense = transactions
    .filter(t => t.type === "expense") // Pega só as despesas
    .reduce((sum, t) => sum + t.amount, 0); // Soma tudo
  
  // CALCULA SALDO (receitas - despesas)
  const balance = totalIncome - totalExpense;

  return (
    <ScrollView style={styles.container}>
      
      {/* CABEÇALHO COM SALDO */}
      <View style={styles.header}>
        <Text style={styles.appName}>Monetra</Text>
        <Text style={styles.balanceLabel}>Saldo disponível</Text>
        <Text style={styles.balanceValue}>
          {/* Formata para moeda brasileira: R$ 5.231,89 */}
          R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </Text>
        
        {/* Linha com Receitas e Despesas */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Receitas</Text>
            <Text style={[styles.summaryValue, { color: colors.success }]}>
              R$ {totalIncome.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Despesas</Text>
            <Text style={[styles.summaryValue, { color: colors.expense }]}>
              R$ {totalExpense.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </Text>
          </View>
        </View>
      </View>

      {/* SEÇÃO: GASTOS POR CATEGORIA */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gastos por categoria</Text>
        {/* Percorre cada categoria e mostra a barra de progresso */}
        {Object.entries(categoryPercentages).map(([category, percentage]) => (
          <View key={category} style={styles.categoryItem}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryName}>{category}</Text>
              <Text style={styles.categoryPercentage}>{percentage}%</Text>
            </View>
            {/* Barra de progresso */}
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${percentage}%`, backgroundColor: colors.category }]} />
            </View>
          </View>
        ))}
      </View>

      {/* SEÇÃO: TRANSAÇÕES RECENTES */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transações recentes</Text>
        {/* Lista as últimas transações */}
        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionItem}>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionDesc}>{transaction.description}</Text>
              <Text style={styles.transactionCategory}>{transaction.category}</Text>
            </View>
            {/* Valor com sinal + ou - */}
            <Text style={[
              styles.transactionAmount,
              { color: transaction.type === "income" ? colors.success : colors.expense }
            ]}>
              {transaction.type === "income" ? "+ " : "- "}
              R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa a tela toda
    backgroundColor: colors.background, // Fundo escuro
  },
  header: {
    backgroundColor: colors.card, // Fundo do card
    padding: spacing.lg,
    paddingTop: spacing.xxl, // Espaço extra no topo
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  appName: {
    ...typography.title, // Fonte grande
    color: colors.primary, // Cor verde
    marginBottom: spacing.lg,
  },
  balanceLabel: {
    ...typography.caption, // Fonte pequena
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  balanceValue: {
    ...typography.title,
    fontSize: 48, // Valor bem grande em destaque
    color: colors.white,
    marginBottom: spacing.lg,
  },
  summaryRow: {
    flexDirection: "row", // Receita e Despesa lado a lado
    justifyContent: "space-between",
    marginTop: spacing.md,
  },
  summaryItem: {
    flex: 1, // Cada um ocupa metade do espaço
  },
  summaryLabel: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  summaryValue: {
    ...typography.subtitle,
    fontSize: 18,
  },
  section: {
    padding: spacing.lg,
    borderBottomWidth: 1, // Separador entre seções
    borderBottomColor: colors.border,
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colors.white,
    marginBottom: spacing.md,
  },
  categoryItem: {
    marginBottom: spacing.md,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between", // Nome de um lado, % do outro
    marginBottom: spacing.xs,
  },
  categoryName: {
    ...typography.body,
    color: colors.text,
  },
  categoryPercentage: {
    ...typography.body,
    color: colors.textSecondary,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  transactionItem: {
    flexDirection: "row", // Descrição e valor lado a lado
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDesc: {
    ...typography.body,
    color: colors.white,
  },
  transactionCategory: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  transactionAmount: {
    ...typography.body,
    fontWeight: "600",
  },
});