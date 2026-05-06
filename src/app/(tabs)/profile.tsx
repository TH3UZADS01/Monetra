// FUNÇÃO: Tela de perfil do usuário com opções e botão de sair

// Importações 
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { colors, spacing, typography } from "@/styles/theme"; // Cores e estilos
import { useAuth } from "@/contexts/AuthContext"; // Hook de autenticação
import { Feather } from "@expo/vector-icons"; // Ícones

export default function Profile() {
  // Pega os dados do usuário e a função de sair do contexto de autenticação
  const { user, signOut } = useAuth();

  // Função que pergunta se o usuário realmente quer sair
  const handleLogout = () => {
    Alert.alert(
      "Sair", // Título do alerta
      "Tem certeza que deseja sair?", // Mensagem
      [
        { text: "Cancelar", style: "cancel" }, // Botão cancelar (cinza)
        { text: "Sair", onPress: signOut, style: "destructive" } // Botão sair (vermelho)
      ]
    );
  };

  return (
    <View style={styles.container}>
      
      {/* CABEÇALHO COM FOTO E DADOS DO USUÁRIO */}
      <View style={styles.header}>
        {/* Ícone de usuário (foto temporária) */}
        <View style={styles.avatar}>
          <Feather name="user" size={40} color={colors.white} />
        </View>
        {/* Nome do usuário - se não tiver, mostra "Usuário" */}
        <Text style={styles.name}>{user?.name || "Usuário"}</Text>
        {/* Email do usuário - se não tiver, mostra um email padrão */}
        <Text style={styles.email}>{user?.email || "usuario@email.com"}</Text>
      </View>

      {/* MENU DE OPÇÕES */}
      <View style={styles.menu}>
        
        {/* Opção 1: Configurações */}
        <TouchableOpacity style={styles.menuItem}>
          <Feather name="settings" size={24} color={colors.text} />
          <Text style={styles.menuText}>Configurações</Text>
          <Feather name="chevron-right" size={20} color={colors.textSecondary} style={styles.menuIcon} />
        </TouchableOpacity>
        
        {/* Opção 2: Notificações */}
        <TouchableOpacity style={styles.menuItem}>
          <Feather name="bell" size={24} color={colors.text} />
          <Text style={styles.menuText}>Notificações</Text>
          <Feather name="chevron-right" size={20} color={colors.textSecondary} style={styles.menuIcon} />
        </TouchableOpacity>
        
        {/* Opção 3: Conectar Banco (diferencial do app) */}
        <TouchableOpacity style={styles.menuItem}>
          <Feather name="credit-card" size={24} color={colors.text} />
          <Text style={styles.menuText}>Conectar Banco</Text>
          <Feather name="chevron-right" size={20} color={colors.textSecondary} style={styles.menuIcon} />
        </TouchableOpacity>
        
        {/* Opção 4: Sair (botão vermelho) */}
        <TouchableOpacity style={[styles.menuItem, styles.logout]} onPress={handleLogout}>
          <Feather name="log-out" size={24} color={colors.expense} />
          <Text style={[styles.menuText, { color: colors.expense }]}>Sair</Text>
        </TouchableOpacity>
        
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
    alignItems: "center", // Centraliza os itens
    padding: spacing.xl, // Espaçamento interno
    backgroundColor: colors.card, // Fundo do card
    borderBottomWidth: 1, // Borda inferior
    borderBottomColor: colors.border, // Cor da borda
  },
  avatar: {
    width: 100, // Largura do círculo
    height: 100, // Altura do círculo
    borderRadius: 50, // Borda 50% = círculo perfeito
    backgroundColor: colors.primary, // Fundo verde
    alignItems: "center", // Centraliza o ícone na horizontal
    justifyContent: "center", // Centraliza o ícone na vertical
    marginBottom: spacing.md, // Espaço abaixo
  },
  name: {
    ...typography.title, // Fonte padrão de título
    fontSize: 24, // Tamanho maior
    color: colors.white, // Texto branco
    marginBottom: spacing.xs,
  },
  email: {
    ...typography.body,
    color: colors.textSecondary, // Cinza claro
  },
  menu: {
    padding: spacing.lg,
    gap: spacing.md, // Espaço entre os botões
  },
  menuItem: {
    flexDirection: "row", // Ícone e texto na mesma linha
    alignItems: "center", // Centraliza verticalmente
    padding: spacing.md,
    backgroundColor: colors.card,
    borderRadius: 8,
    gap: spacing.md, // Espaço entre ícone e texto
    borderWidth: 1, // Borda para destacar
    borderColor: colors.border,
  },
  menuText: {
    ...typography.body,
    color: colors.text,
    flex: 1, // Ocupa o espaço restante (empurra o ícone para a direita)
  },
  menuIcon: {
    marginLeft: "auto", // Seta fica no final da linha
  },
  logout: {
    marginTop: spacing.lg, // Espaço extra acima do botão sair
    borderTopWidth: 1, // Linha separadora
    borderTopColor: colors.border,
  },
});