package com.monetra;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MonetaBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(MonetaBackendApplication.class, args);
    }

    // Configuração básica do Swagger/OpenAPI
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Monetra API")
                        .version("1.0.0")
                        .description("Backend REST API para gerenciamento de transações financeiras"));
    }
}
