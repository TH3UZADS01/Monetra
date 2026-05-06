// FUNÇÃO: Gerenciar a autenticação do usuário (login, cadastro, logout)

import React, { createContext, useContext, useState, useEffect } from 'react';
import { router } from 'expo-router'; // Para navegar entre telas

// Interface que define a estrutura do usuário
interface User {
  id: string;      // Identificador único
  name: string;    // Nome do usuário
  email: string;   // E-mail
}

// Interface que define o que o contexto de autenticação vai fornecer
interface AuthContextData {
  user: User | null;              // Dados do usuário (ou null se não logado)
  loading: boolean;                // Indica se está carregando (login/cadastro)
  signIn: (email: string, password: string) => Promise<void>; // Função de login
  signUp: (name: string, email: string, password: string) => Promise<void>; // Função de cadastro
  signOut: () => void;            // Função de logout
}

// Cria o contexto (vazio por enquanto)
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Componente provedor - envolve o app e disponibiliza as informações
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Estados
  const [user, setUser] = useState<User | null>(null); // Usuário logado
  const [loading, setLoading] = useState(true);        // Carregamento inicial

  // useEffect: roda quando o app inicia
  useEffect(() => {
    checkUserLogged(); // Verifica se já tem usuário logado
  }, []);

  // Função que verifica se já existe usuário logado (AsyncStorage)
  const checkUserLogged = async () => {
    try {
      // SIMULAÇÃO: aqui no futuro vai buscar do AsyncStorage
      // const storedUser = await AsyncStorage.getItem('@user');
      const storedUser = null; // Por enquanto, nenhum usuário salvo
      setUser(storedUser);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Terminou o carregamento
    }
  };

  // Função de LOGIN
  const signIn = async (email: string, password: string) => {
    setLoading(true); // Mostra loading no botão
    try {
      // SIMULAÇÃO: espera 1.5 segundos (como se fosse uma requisição à API)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Cria os dados do usuário (futuramente virá do backend)
      const userData = {
        id: '1',
        name: 'Usuário',
        email: email,
      };
      
      setUser(userData); // Salva o usuário no estado
      // SALVAR no AsyncStorage (futuramente)
      // await AsyncStorage.setItem('@user', JSON.stringify(userData));
      
      router.replace('/(tabs)'); // Vai para a tela principal
    } catch (error) {
      throw new Error('Erro ao fazer login');
    } finally {
      setLoading(false); // Termina o carregamento
    }
  };

  // Função de CADASTRO
  const signUp = async (name: string, email: string, password: string) => {
    setLoading(true); // Mostra loading no botão
    try {
      // SIMULAÇÃO: espera 1.5 segundos (como se fosse uma requisição à API)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Cria os dados do usuário (futuramente virá do backend)
      const userData = {
        id: '1',
        name: name,
        email: email,
      };
      
      setUser(userData); // Salva o usuário no estado
      // SALVAR no AsyncStorage (futuramente)
      // await AsyncStorage.setItem('@user', JSON.stringify(userData));
      
      router.replace('/(tabs)'); // Vai para a tela principal
    } catch (error) {
      throw new Error('Erro ao fazer cadastro');
    } finally {
      setLoading(false); // Termina o carregamento
    }
  };

  // Função de LOGOUT
  const signOut = () => {
    setUser(null); // Limpa o usuário do estado
    // REMOVER do AsyncStorage (futuramente)
    // await AsyncStorage.removeItem('@user');
    router.replace('/'); // Volta para a tela de login
  };

  // Retorna o provedor com todas as funções e dados
  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children} {/* Todos os componentes dentro vão ter acesso */}
    </AuthContext.Provider>
  );
}

// Hook personalizado para usar o contexto em qualquer lugar
export const useAuth = () => useContext(AuthContext);