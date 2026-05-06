// FUNÇÃO: Arquivo principal de rotas do app - Define como a navegação vai funcionar

// Importa o componente Stack do Expo Router (navegação por pilha)
import { Stack } from 'expo-router';
// Importa o provedor de autenticação (contexto que gerencia login/logout)
import { AuthProvider } from '@/contexts/AuthContext';

// Componente principal que define a estrutura de navegação
export default function RootLayout() {
  return (
    // Envolve todo o app com o provedor de autenticação
    // Isso faz com que todas as telas tenham acesso às informações do usuário
    <AuthProvider>
      
      {/* Stack: navegação por pilha (empilha telas) */}
      {/* Ex: Login -> Cadastro -> Tela Principal */}
      <Stack screenOptions={{ headerShown: false }}>
        
        {/* Tela de Login - primeira tela do app */}
        <Stack.Screen name="index" />
        
        {/* Tela de Cadastro - acessada pelo link na tela de login */}
        <Stack.Screen name="signup" />
        
        {/* Grupo de telas principais (abas) - acessado após o login */}
        <Stack.Screen name="(tabs)" />
        
      </Stack>
    </AuthProvider>
  );
}