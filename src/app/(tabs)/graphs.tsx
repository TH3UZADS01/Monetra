// FUNÇÃO: Mostrar gráficos e estatísticas dos gastos

// Importações 
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { colors, spacing, typography } from "@/styles/theme"; // Cores e estilos
import { Category } from "@/types/transaction"; // Tipos de categoria

// Dados fixos de exemplo - mostra quanto cada categoria representa dos gastos
const categoryPercentages: Record<Category, number> = {
  "Alimentação": 40,  // 40% dos gastos
  "Transporte": 25,   // 25% dos gastos
  "Moradia": 20,      // 20% dos gastos
  "Lazer": 10,        // 10% dos gastos
  "Outros": 5,        // 5% dos gastos
};

export default function Graphs() {
  const totalExpense = 2218.11; // Total gasto no mês (fixo por enquanto)

  return (
    <View style={styles.container}>
      
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Gráficos</Text>
        <Text style={styles.headerSubtitle}>Mês atual</Text>
      </View>

      {/* CARD COM TOTAL GASTO */}
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Gastos no mês</Text>
        <Text style={styles.totalValue}>
          {/* Formata o valor para moeda brasileira (R$ 2.218,11) */}
          R$ {totalExpense.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </Text>
      </View>

      {/* LISTA DE CATEGORIAS COM BARRAS DE PROGRESSO */}
      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Distribuição por categoria</Text>
        
        {/* Percorre cada categoria e mostra a porcentagem */}
        {Object.entries(categoryPercentages).map(([category, percentage]) => (
          <View key={category} style={styles.categoryItem}>
            
            {/* Linha com nome e porcentagem */}
            <View style={styles.categoryHeader}>
              <View style={[styles.colorDot, { backgroundColor: colors.category }]} />
              <Text style={styles.categoryName}>{category}</Text>
              <Text style={styles.categoryPercentage}>{percentage}%</Text>
            </View>
            
            {/* Barra de progresso (verde) */}
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${percentage}%`, backgroundColor: colors.category }]} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa a tela toda
    backgroundColor: colors.background, // Fundo escuro
  },
  header: {
    backgroundColor: colors.card,
    padding: spacing.lg,
    paddingTop: spacing.xxl, // Espaço extra no topo
    alignItems: "center", // Centraliza os textos
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    ...typography.title, // Fonte grande e grossa
    color: colors.white,
  },
  headerSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  totalCard: {
    backgroundColor: colors.card,
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: 12, 
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  totalLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  totalValue: {
    ...typography.title,
    fontSize: 36, // Valor grande em destaque
    color: colors.expense, // Vermelho (despesa)
    marginTop: spacing.sm,
  },
  chartContainer: {
    padding: spacing.lg,
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
    flexDirection: "row", // Itens em linha
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6, // Círculo
    marginRight: spacing.sm,
  },
  categoryName: {
    ...typography.body,
    color: colors.text,
    flex: 1, // Ocupa o espaço restante
  },
  categoryPercentage: {
    ...typography.body,
    color: colors.textSecondary,
  },
  progressBar: {
    height: 8, // Barra fininha
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: "hidden", // Para a barra verde não sair das bordas
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
});