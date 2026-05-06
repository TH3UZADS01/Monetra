// FUNÇÃO: Tela para adicionar nova transação (gasto ou receita)

// Importações 
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useState } from "react"; // Para criar variáveis que mudam na tela
import { router } from "expo-router"; // Para navegar entre telas
import { colors, spacing, typography } from "@/styles/theme"; // Cores e estilos
import { Category, TransactionType } from "@/types/transaction"; // Tipos de dados

// Lista de categorias disponíveis para o usuário escolher
const categories: Category[] = ["Alimentação", "Transporte", "Moradia", "Lazer", "Outros"];

export default function AddTransaction() {
  // Estados: variáveis que o React monitora e atualiza a tela quando mudam
  const [description, setDescription] = useState(""); // O que foi comprado
  const [amount, setAmount] = useState(""); // Valor gasto/recebido
  const [type, setType] = useState<TransactionType>("expense"); // Se é despesa ou receita
  const [category, setCategory] = useState<Category>("Outros"); // Categoria da transação

  // Função que salva a transação quando o usuário clica em Salvar
  const handleSave = () => {
    // Validações: verifica se os campos estão preenchidos
    if (!description || !amount) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    // Converte o valor 
    const amountNumber = parseFloat(amount.replace(",", "."));
    if (isNaN(amountNumber) || amountNumber <= 0) {
      Alert.alert("Erro", "Valor inválido");
      return;
    }

    // Aqui futuramente vai salvar no banco de dados
    console.log({ description, amount: amountNumber, type, category });
    
    // Avisa que deu certo e volta para a tela anterior
    Alert.alert("Sucesso", "Transação adicionada!", [
      { text: "OK", onPress: () => router.back() }
    ]);
  };

  return (
    // ScrollView: permite rolar a tela se o conteúdo for grande
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        
        {/* CAMPO: Descrição */}
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Supermercado"
          placeholderTextColor={colors.textSecondary}
          value={description}
          onChangeText={setDescription} // Atualiza o estado ao digitar
        />

        {/* CAMPO: Valor */}
        <Text style={styles.label}>Valor</Text>
        <TextInput
          style={styles.input}
          placeholder="0,00"
          placeholderTextColor={colors.textSecondary}
          keyboardType="decimal-pad" // Teclado numérico com vírgula
          value={amount}
          onChangeText={setAmount}
        />

        {/* BOTÕES: Tipo (Despesa ou Receita) */}
        <Text style={styles.label}>Tipo</Text>
        <View style={styles.typeRow}>
          <TouchableOpacity
            style={[styles.typeButton, type === "expense" && styles.typeButtonActive]}
            onPress={() => setType("expense")}
          >
            <Text style={[styles.typeText, type === "expense" && { color: colors.white }]}>
              Despesa
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, type === "income" && styles.typeButtonActive]}
            onPress={() => setType("income")}
          >
            <Text style={[styles.typeText, type === "income" && { color: colors.white }]}>
              Receita
            </Text>
          </TouchableOpacity>
        </View>

        {/* BOTÕES: Categorias */}
        <Text style={styles.label}>Categoria</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.categoryButton, category === cat && styles.categoryButtonActive]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[styles.categoryText, category === cat && { color: colors.white }]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* BOTÃO: Salvar */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa a tela toda
    backgroundColor: colors.background, // Fundo escuro
  },
  form: {
    padding: spacing.lg, // Espaçamento interno
  },
  label: {
    ...typography.body, // Fonte padrão
    color: colors.white, // Texto branco
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  input: {
    backgroundColor: colors.card, // Fundo do campo
    color: colors.white, // Texto branco
    padding: spacing.md,
    borderRadius: 8, // Bordas arredondadas
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border, // Borda cinza
  },
  typeRow: {
    flexDirection: "row", // Botões lado a lado
    gap: spacing.md, // Espaço entre eles
    marginTop: spacing.xs,
  },
  typeButton: {
    flex: 1, // Ocupa espaço igual
    padding: spacing.md,
    backgroundColor: colors.card,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },
  typeButtonActive: {
    backgroundColor: colors.primary, // Fica verde quando selecionado
    borderColor: colors.primary,
  },
  typeText: {
    color: colors.text,
    fontWeight: "600",
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap", // Quebra linha se não couber
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  categoryButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.card,
    borderRadius: 20, 
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryButtonActive: {
    backgroundColor: colors.category, // Roxo quando selecionado
    borderColor: colors.category,
  },
  categoryText: {
    color: colors.text,
  },
  saveButton: {
    backgroundColor: colors.primary, // Botão verde
    padding: spacing.md,
    borderRadius: 8,
    alignItems: "center",
    marginTop: spacing.xl,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});