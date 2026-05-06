import { useState } from "react";
import { Image, StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, Platform, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Link } from "expo-router";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function Index() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        Keyboard.dismiss();
        
        if (!email.trim() || !senha) {
            Alert.alert("Campos obrigatórios", "Por favor, preencha todos os campos");
            return;
        }
        
        if (!validateEmail(email)) {
            Alert.alert("E-mail inválido", "Por favor, insira um e-mail válido (exemplo@email.com)");
            return;
        }
        
        if (senha.length < 6) {
            Alert.alert("Senha inválida", "A senha deve ter pelo menos 6 caracteres");
            return;
        }
        

        setLoading(true);
        
        setTimeout(() => {
            setLoading(false);
            Alert.alert(
                "Login realizado!", 
                `Bem-vindo de volta, ${email}`,
                [
                    { 
                        text: "Continuar", 
                        onPress: () => {
                            console.log("Login:", { email, senha });
                        }
                    }
                ]
            );
        }, 2000);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView 
                style={{ flex: 1 }} 
                behavior={Platform.select({ ios: "padding", android: "height" })}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <Image source={require("@/assets/logo.png")} style={styles.illustration} />

                        <Text style={styles.title}>Entrar</Text>
                        <Text style={styles.subtitle}>Acesse sua conta com e-mail e senha.</Text>

                        <View style={styles.form}>
                            <Input 
                                placeholder="E-mail" 
                                keyboardType="email-address"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            <Input 
                                placeholder="Senha" 
                                secureTextEntry
                                value={senha}
                                onChangeText={setSenha}
                            />

                            <Button 
                                label={loading ? "Entrando..." : "Entrar"} 
                                onPress={handleLogin}
                                disabled={loading}
                            />
                        </View>
                        
                        <Text style={styles.footerText}>
                            Não tem uma conta? {" "}
                            <Link href="/signup" style={styles.footerLink}>
                                Cadastre-se aqui.
                            </Link>
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "#121212", 
        padding: 32,
    },
    illustration: {
        width: "100%",
        height: 330,
        resizeMode: "contain",
        marginTop: 62,
        marginBottom: 24,  
    },
    title: {
        fontSize: 32,
        fontWeight: "900",
        color: "#ffffff",
    },
    subtitle: {
        fontSize: 16,
        color: "#ffffff",
        marginTop: 8,
    },
    form: {
        marginTop: 24,
        gap: 12,
    },
    footerText: {
        textAlign: "center",
        marginTop: 24,
        color: "#ffffff",
    },
    footerLink: {
        color: "#009624",
        fontWeight: 700,
    },
})