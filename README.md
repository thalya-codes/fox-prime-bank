# 🦊 Fox Prime Bank

**Fox Prime Bank** é uma aplicação robusta desenvolvida com foco na gestão de contas bancárias, autenticação segura e operações de transações.

## 🚀 Tecnologias utilizadas

- **Next.js** — Framework React para desenvolvimento fullstack.
- **Toastify** — Notificações amigáveis e customizadas.
- **Tailwind CSS** — Estilização rápida e eficiente.
- **React Query** — Gerenciamento de estado assíncrono e cache.
- **MongoDB** — Banco de dados NoSQL.
- **JWT** — Autenticação via token.

---

## ▶️ Como rodar o projeto

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
cd fox-prime-bank
```

2. Instale as dependências:
```bash
npm install
```
3. Inicie a aplicação:
 ```bash
npm run dev
```
## 📚 Endpoints da API

A estrutura de rotas do projeto está organizada da seguinte forma:

- `/api/account/[userId]`  
  Gerenciamento de contas bancárias.

- `/api/auth/`
  - `/login` — Autenticação do usuário.
  - `/logout` — Encerrar sessão.
  - `/register` — Cadastro de novo usuário.
  - `/refresh` — Renovação de token.
  - `/change-password` — Alteração de senha.

- `/api/transactions/[userId]/[transactionId]`  
  CRUD de transações financeiras.

- `/api/users/[id]`  
  Gestão de usuários.

---

## 🎨 Design System

Para garantir uma **maior consistência visual** entre os produtos da empresa, foi desenvolvido um **Design System** próprio. Que pode ser conferido no link abaixo.

### [Fox Neo Design System](https://github.com/thalya-codes/fox-neo-design-system)
