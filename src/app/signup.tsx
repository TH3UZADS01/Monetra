import { useState } from "react";
import { Image, StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, Platform, Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Link } from "expo-router";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export default function Singup() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [loading, setLoading] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignup = () => {
        Keyboard.dismiss();
        
        if (!nome.trim() || !email.trim() || !senha || !confirmarSenha) {
            Alert.alert("Erro", "Por favor, preencha todos os campos");
            return;
        }
        
        if (nome.trim().length < 3) {
            Alert.alert("Erro", "O nome deve ter pelo menos 3 caracteres");
            return;
        }
        
        if (!validateEmail(email)) {
            Alert.alert("Erro", "Por favor, insira um e-mail válido (exemplo@email.com)");
            return;
        }
        
        if (senha.length < 6) {
            Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres");
            return;
        }
        
        if (senha !== confirmarSenha) {
            Alert.alert("Erro", "As senhas não conferem");
            return;
        }
        
        setLoading(true);
        
        setTimeout(() => {
            setLoading(false);
            Alert.alert(
                "Sucesso!", 
                `Conta criada com sucesso!\nBem-vindo(a), ${nome.trim()}!`,
                [
                    { 
                        text: "OK", 
                        onPress: () => {
                            console.log("Cadastro realizado:", { nome, email, senha });
                        }
                    }
                ]
            );
            
            setNome("");
            setEmail("");
            setSenha("");
            setConfirmarSenha("");
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

                        <Text style={styles.title}>Cadastrar</Text>
                        <Text style={styles.subtitle}>Crie sua conta para acessar.</Text>  
                        
                        <View style={styles.form}>
                            <Input 
                                placeholder="Nome"
                                value={nome}
                                onChangeText={setNome}
                                autoCapitalize="words"
                            />
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
                            <Input 
                                placeholder="Confirme sua senha" 
                                secureTextEntry
                                value={confirmarSenha}
                                onChangeText={setConfirmarSenha}
                            />

                            <Button 
                                label={loading ? "Cadastrando..." : "Cadastrar"} 
                                onPress={handleSignup}
                                disabled={loading}
                            />
                        </View>
                        
                        <Text style={styles.footerText}>
                            já tem uma conta? {" "}
                            <Link href="/" style={styles.footerLink}>
                                Entre aqui.
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
        color: "#FFFFFF", 
    },
    subtitle: {  
        fontSize: 16,
        color: "#FFFFFF", 
        marginTop: 8,
    },
    form: {
        marginTop: 24,
        gap: 12,
    },
    footerText: {
        textAlign: "center",
        marginTop: 24,
        color: "#FFFFFF",  
    },
    footerLink: {
        color: "#009624", 
        fontWeight: 700,
    }
})