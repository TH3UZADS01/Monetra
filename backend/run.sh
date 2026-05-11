#!/bin/bash
# Script para executar o Monetra Backend

echo "🚀 Iniciando Monetra Backend..."
cd "$(dirname "$0")"

if [ ! -f "target/monetra-backend-1.0.0.jar" ]; then
    echo "📦 Compilando o projeto..."
    mvn clean package -q -DskipTests
fi

echo "✅ Iniciando aplicação..."
java -jar target/monetra-backend-1.0.0.jar

echo "🌐 Acesse http://localhost:8080/swagger-ui.html"
