// FUNÇÃO: Arquivo principal de navegação do app - Define a ordem das telas

// Importa o componente Stack (pilha de navegação)
import { Stack } from 'expo-router';
// Importa o provedor que gerencia o login do usuário
import { AuthProvider } from '@/contexts/AuthContext';

// Componente principal que organiza a navegação
export default function RootLayout() {
  return (
    // AuthProvider: disponibiliza dados do usuário para TODAS as telas
    <AuthProvider>
      
      {/* Stack: navegação tipo pilha (empilha e desempilha telas) */}
      {/* headerShown: false esconde o cabeçalho padrão */}
      <Stack screenOptions={{ headerShown: false }}>
        
        {/* Tela 1: Login (primeira a aparecer) */}
        <Stack.Screen name="index" />
        
        {/* Tela 2: Cadastro (acessada pelo link na tela de login) */}
        <Stack.Screen name="signup" />
        
        {/* Tela 3: Abas principais (aparece após o login) */}
        <Stack.Screen name="(tabs)" />
        
      </Stack>
    </AuthProvider>
  );
}