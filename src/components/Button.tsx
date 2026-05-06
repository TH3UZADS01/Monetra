// FUNÇÃO: Componente de botão reutilizável em todo o app

// Importações 
import {
    StyleSheet,
    Text,                // Para mostrar o texto do botão
    TouchableOpacity,    // Componente que detecta toques (mais personalizável que Button)
    TouchableOpacityProps, // Tipos das propriedades do TouchableOpacity
} from "react-native"

// Define quais propriedades o botão vai aceitar
// TouchableOpacityProps: herda todas as propriedades do TouchableOpacity (onPress, disabled, etc)
// & significa "e também" - vai ter as propriedades do TouchableOpacity MAIS a label
type ButtonProps = TouchableOpacityProps & {
    label: string  // label é o texto que vai aparecer no botão
}

// Componente Button
// { label, ...rest } pega a propriedade label e guarda o resto em ...rest
export function Button({ label, ...rest }: ButtonProps) { 
    return (
        // TouchableOpacity: componente clicável que diminui a opacidade quando tocado
        // style={styles.container} - aplica o estilo padrão
        // {...rest} - passa todas as outras propriedades (onPress, disabled, etc)
        <TouchableOpacity style={styles.container} {...rest}>
            {/* Texto do botão */}
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    )
}

// Estilos do botão
const styles = StyleSheet.create({
    container: {
        width: "100%",      // Largura total do container pai
        height: 48,         // Altura fixa de 48 pixels
        backgroundColor: "#00c853", // Cor verde (principal do app)
        alignItems: "center",    // Centraliza o texto na horizontal
        justifyContent: "center", // Centraliza o texto na vertical
        borderRadius: 8,     // Bordas arredondadas
    },

    label: {
        color: "#FFFFFF",    // Texto branco
        fontSize: 16,        // Tamanho da fonte
        fontWeight: "600",   // Negrito (sem ser muito pesado)
    }
})