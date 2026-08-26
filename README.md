# Testes de API & Contrato - Apex

Este repositório contém meus estudos práticos de automação de testes de backend e **validação de contratos** de API utilizando **Jest**, **Supertest** e **Ajv** (com TypeScript) para a plataforma **Apex**.

---

## O que eu implementei até agora:

* **Testes de Contrato com JSON Schema:** Defini os schemas da estrutura esperada de retorno dos dados usando a especificação JSON Schema, protegendo o frontend contra mudanças acidentais na API do backend.
* **Teste do Endpoint de Monitoramento (`health-check.spec.ts`):** Valida se o endpoint principal de status do servidor está online e atende ao contrato de dados de saúde do sistema.
* **Testes de Fluxos de Senha (`verify-reset-code.spec.ts` e `request-password-reset.spec.ts`):** Valida as mensagens de erro e o status retornado (`400 Bad Request`) quando a chamada de reset de senha é feita de forma incompleta.
* **Pipeline Integrado (GitHub Actions):** Configurei uma esteira de CI/CD para executar os testes na nuvem em cada push e garantir que as chaves de acesso sejam lidas de forma segura através dos GitHub Secrets.

---

## Como rodar o projeto localmente

### 1. Instalar as dependências
```bash
npm install
```

### 2. Executar os testes
Você pode executar o teste contra o seu backend local do Supabase ou apontar para um ambiente remoto configurado nas variáveis de ambiente:

```bash
# Apontando para o seu backend ou homologação
API_URL=https://sua-api.com/v1 SUPABASE_ANON_KEY="sua-chave-aqui" npm test
```

---

## Aprendizados e Desafios:
* **Validação Estática de Erros:** Aprendi a importância de testar contratos de erro. Se o backend alterar um campo de erro de `error` para `message`, o frontend pode falhar ao exibir os alertas para o usuário.
* **Configuração TypeScript no Jest:** Precisei configurar o `ts-jest` e ajustar o `tsconfig.json` com `esModuleInterop` para resolver a compatibilidade de importações do módulo `supertest`.
