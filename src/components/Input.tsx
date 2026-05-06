// FUNÇÃO: Componente de campo de texto reutilizável

// Importações 
import { TextInput, StyleSheet, TextInputProps } from "react-native"
import { colors } from "@/styles/theme"; // Importa as cores do tema

// Componente Input
// placeholderTextColor: cor do texto de exemplo (placeholder)
// ...rest: todas as outras propriedades (value, onChangeText, etc)
export function Input({ placeholderTextColor, ...rest }: TextInputProps) {
    return (
        <TextInput 
            style={styles.input}
            // Se não passar uma cor específica, usa o cinza claro do tema
            placeholderTextColor={placeholderTextColor || colors.textSecondary}
            {...rest} 
        />
    )
}

// Estilos do campo de texto
const styles = StyleSheet.create({
    input: {
        width: "100%",           // Largura total
        height: 48,              // Altura fixa
        borderWidth: 1,          // Largura da borda
        borderColor: colors.border,  // Cor da borda (cinza médio)
        borderRadius: 8,         // Bordas arredondadas
        fontSize: 16,            // Tamanho da fonte
        paddingLeft: 12,         // Espaçamento interno esquerdo
        color: colors.white,     // COR DO TEXTO DIGITADO - BRANCO (visível no fundo escuro)
        backgroundColor: colors.card, // FUNDO DO INPUT - CINZA ESCURO
    },
})