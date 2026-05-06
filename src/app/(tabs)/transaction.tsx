// FUNÇÃO: Lista todas as transações do usuário (gastos e receitas)

// Importações 
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useState } from "react";
import { colors, spacing, typography } from "@/styles/theme";
import { Transaction } from "@/types/transaction";

// DADOS DE EXEMPLO - Lista de transações para testar a tela
// Cada transação tem: id, descrição, valor, tipo, categoria e data
const mockTransactions: Transaction[] = [
  { id: "1", description: "Supermercado", amount: 85.40, type: "expense", category: "Alimentação", date: new Date(2026, 4, 5) },
  { id: "2", description: "Uber", amount: 27.80, type: "expense", category: "Transporte", date: new Date(2026, 4, 4) },
  { id: "3", description: "Salário", amount: 7450.00, type: "income", category: "Outros", date: new Date(2026, 4, 1) },
  { id: "4", description: "Netflix", amount: 45.90, type: "expense", category: "Lazer", date: new Date(2026, 3, 28) },
  { id: "5", description: "Aluguel", amount: 1200.00, type: "expense", category: "Moradia", date: new Date(2026, 4, 1) },
  { id: "6", description: "Cinema", amount: 35.00, type: "expense", category: "Lazer", date: new Date(2026, 4, 3) },
];

export default function Transactions() {
  // Estado para armazenar as transações (futuramente virá do banco)
  const [transactions] = useState(mockTransactions);

  // Função que renderiza cada item da lista
  // O FlatList chama esta função para cada transação
  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      
      {/* Lado esquerdo: descrição, categoria e data */}
      <View style={styles.transactionInfo}>
        <Text style={styles.transactionDesc}>{item.description}</Text>
        <View style={styles.transactionMeta}>
          <Text style={styles.transactionCategory}>{item.category}</Text>
          <Text style={styles.transactionDate}>
            {/* Formata a data: dd/mm/aaaa */}
            {item.date.toLocaleDateString('pt-BR')}
          </Text>
        </View>
      </View>
      
      {/* Lado direito: valor com sinal + ou - */}
      <Text style={[
        styles.transactionAmount,
        // Se for receita, texto verde; se for despesa, texto vermelho
        { color: item.type === "income" ? colors.success : colors.expense }
      ]}>
        {item.type === "income" ? "+ " : "- "}
        R$ {item.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* FlatList: componente otimizado para listas grandes */}
      <FlatList
        data={transactions}           // Dados da lista
        keyExtractor={(item) => item.id} // Identificador único de cada item
        renderItem={renderItem}       // Função que desenha cada item
        contentContainerStyle={styles.list} // Estilo do container
        showsVerticalScrollIndicator={false} // Esconde barra de rolagem
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa a tela toda
    backgroundColor: colors.background, // Fundo escuro
  },
  list: {
    padding: spacing.md, // Espaçamento interno
  },
  transactionItem: {
    flexDirection: "row", // Descrição e valor lado a lado
    justifyContent: "space-between", // Espaço entre os dois lados
    alignItems: "center", // Centraliza verticalmente
    backgroundColor: colors.card, // Fundo do card
    padding: spacing.md,
    borderRadius: 8, // Bordas arredondadas
    marginBottom: spacing.sm, // Espaço entre os itens
    borderWidth: 1, // Borda
    borderColor: colors.border,
  },
  transactionInfo: {
    flex: 1, // Ocupa o espaço disponível
  },
  transactionDesc: {
    ...typography.body,
    color: colors.white, // Descrição em branco
    fontWeight: "600", // Negrito
    marginBottom: 4, // Espaço abaixo da descrição
  },
  transactionMeta: {
    flexDirection: "row", // Categoria e data lado a lado
    gap: 12, // Espaço entre eles
  },
  transactionCategory: {
    ...typography.caption, // Fonte pequena
    color: colors.textSecondary,
  },
  transactionDate: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  transactionAmount: {
    ...typography.subtitle,
    fontSize: 16,
    fontWeight: "600",
  },
});