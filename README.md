### 📄 Documentação do Desafio Técnico

#### 1. Tecnologias Utilizadas
* **Backend:** Node.js, NestJS, TypeScript, Prisma ORM.
* **Frontend:** React (Vite), Tailwind CSS, Shadcn/UI, Lucide React (ícones), Axios.
* **Banco de Dados:** PostgreSQL (Configuração principal) / SQLite (Suporte).

---

#### 2. Arquitetura e Fluxo de Requisição
O sistema segue uma arquitetura modular, onde cada funcionalidade (Produto, Categoria) possui seu próprio módulo, controller e service.

* **Controller:** Responsável por receber as rotas e validar a entrada de dados via DTOs (Data Transfer Objects).
* **Service:** Camada onde reside a regra de negócio e a comunicação com o banco de dados via Prisma.
* **Frontend:** Camada de visão que consome a API de forma assíncrona, gerenciando estados de paginação e filtros via URL utilizando `useSearchParams`.

---

#### 3. Uso de Inteligência Artificial (Requisito 5)
Conforme solicitado, informo que utilizei o **Gemini (Google)** e o **GitHub Copilot** como assistentes durante o desenvolvimento.

* **Partes desenvolvidas com auxílio da IA:**
    * Estruturação da lógica de paginação no backend (cálculos de `skip` e `take`).
    * Estruturação base dos componentes de Card e Formulário utilizando Tailwind CSS.
    * Lógica de sincronização da página atual com os parâmetros da URL no React.
    * **Documentação e Revisão:** A IA foi utilizada para auxiliar na escrita desta documentação, corrigir o português, organizar a estrutura do README e garantir que todos os requisitos do edital fossem descritos claramente.
* **Adaptações realizadas por mim:**
    * **Conversão de Tipos:** Ajustei o código para receber `strings` da URL e converter manualmente para `number` no Service, garantindo compatibilidade com o Prisma.
    * **Regra de Ordenação:** Implementei a ordenação decrescente (`orderBy: { id: 'desc' }`) para garantir que novos produtos apareçam no topo da lista.
    * **Tratamento de Erros:** Customizei os filtros de exceção (HTTP 422 e 404) para retornar mensagens claras ao usuário.
    * **Correção de Bugs:** Solucionei conflitos de renderização no Shadcn/UI e comportamentos inesperados em componentes de Card.

---

#### 4. Decisões Técnicas e Melhorias (Requisito 7)
* **Escolha do ORM:** O Prisma foi escolhido pela tipagem estática e facilidade em lidar com relações (`include`), permitindo buscar a Categoria vinculada ao Produto em uma única query.
* **Paginação Server-side:** A paginação ocorre no banco de dados para garantir escalabilidade, evitando sobrecarga de memória no navegador do usuário.
* **Melhorias para Produção:**
    1. Implementação de cache com **Redis** para categorias (dados que mudam com baixa frequência).
    2. Sistema de upload de imagens via **S3** ou **Cloudinary**.
    3. Ampliação da cobertura de testes unitários e de integração.
    4. Containerização completa utilizando **Docker**.
    5. Máscara de entrada em tempo real para campos de preço no frontend.
    6. Configuração de **CORS** dinâmica via variáveis de ambiente para maior segurança.

---

#### 5. Estruturação do Front-End
```text
src/
 ├── assets/         # Arquivos estáticos (Imagens e ícones)
 ├── components/     # Componentes de UI (Shadcn) e Negócio (Cards, Forms)
 │    ├── ui/        # Componentes base reutilizáveis (botões, inputs)
 │    └── Layout/    # Componentes de estrutura (Header, Sidebar)
 ├── lib/            # Configurações utilitárias (Tailwind Merge, Axios config)
 ├── pages/          # Páginas da aplicação (Containers de rotas)
 ├── services/       # Integração com API (Chamadas Axios)
 └── types/          # Definições de interfaces TypeScript (IProducts)
```

#### 6. Estruturação do Back-End
```text
src/
 ├── category/       # Módulo de Categorias (Controller, Service, DTOs)
 ├── products/       # Módulo de Produtos (Regras de negócio e CRUD)
 │    └── dto/       # Validação de dados de entrada (Create, Update, Query)
 ├── prisma/         # Configuração e Service do ORM Prisma
 ├── common/         # Recursos compartilhados (Filtros de erro e Exceptions)
 │    └── filters/   # Tratamento global de erros HTTP (Not Found, etc)
 ├── app.module.ts   # Módulo raiz que orquestra a aplicação
 └── main.ts         # Configuração global (Pipes, CORS, Bootstrap)
```

---

#### 7. Schema Prisma
```prisma
model Category {
  id       Int       @id @default(autoincrement())
  name     String    @unique
  products Product[]

  @@map("categories")
}

model Product {
  id          Int      @id @default(autoincrement())
  name        String
  description String   @db.Text
  price       Float
  stock       Int      @default(0)
  
  // Relação Obrigatória: Um produto deve ter pelo menos uma categoria
  categoryId  Int
  category    Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)

  @@map("products")
}
```

---

#### 8. Documentação Utilizada
* [NestJS Documentation](https://docs.nestjs.com/) - Configuração de módulos e pipes.
* [Prisma Documentation](https://www.prisma.io/docs) - Modelagem de dados e migrations.
* [Tailwind CSS](https://tailwindcss.com/docs) - Estilização responsiva.
* [Shadcn/UI](https://ui.shadcn.com/) - Padrões de componentes e acessibilidade.

---

#### 📚 Referências e Materiais de Apoio
Durante o desenvolvimento, utilizei as seguintes fontes como base para a construção técnica da aplicação:

* **Arquitetura e Banco de Dados:** [Construção de API com NestJS e Prisma](https://www.youtube.com/watch?v=ITc0oDwY3CA) - Utilizado para a estruturação dos módulos do backend e integração com o banco de dados.
* **Validação de Dados:** [Esquemas de Validação com Zod](https://www.youtube.com/watch?v=DA39qCGt6RE) - Utilizado para implementar regras de negócio seguras e tipagem rigorosa nos formulários e DTOs.

---

#### 9. Configuração do Banco de Dados (Prisma)

No diretório `product-api/`, crie o arquivo `.env`:

```env
# Exemplo para PostgreSQL
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO?schema=public"

# Exemplo para SQLite (opcional)
# DATABASE_URL="file:./dev.db"

PORT=3000
```

**Sincronização:**
```bash
pnpm install
npx prisma migrate dev --name init
npx prisma generate
```

---

#### 10. Como rodar o Backend
```bash
pnpm run start:dev
```
Acesse em: `http://localhost:3000`

---

#### 11. Como rodar o Front-End
No diretório `product-front-end/`, crie o arquivo `.env`:
```env
VITE_URL_API_PRODUCTS=http://localhost:3000
```

**Execução:**
```bash
pnpm install
pnpm run dev
```
Acesse em: `http://localhost:5173`

---

Com certeza! Expor as rotas é fundamental para que o avaliador saiba quais endpoints testar (caso queira usar o Postman ou Insomnia) e para demonstrar que você seguiu o contrato solicitado no edital.

Aqui está o bloco para você adicionar logo abaixo da seção **10. Como rodar o Backend**:

---


### 📊 Visualização da Arquitetura e Fluxo

Abaixo estão detalhados os diagramas que serviram de base para a construção da lógica do sistema, desde o mapeamento de entidades até o fluxo de requisições.

#### 🏗️ Arquitetura de Componentes e Rotas (Canva)
Este diagrama detalha todo o fluxo de navegação do usuário, a hierarquia dos componentes React e como as rotas do NestJS se conectam ao frontend.

> **Visualizar Fluxograma Completo**
<img src="./imagens/Products.png" alt="Fluxo Canva" width="700">

---

#### 📐 Modelagem de Dados e Relacionamentos (Excalidraw)
O esquema visual das tabelas, chaves estrangeiras e a estrutura de persistência do Prisma ORM foi planejado utilizando o Excalidraw.

<img src="./imagens/diagrama.png" alt="Fluxo Excalidraw" width="350">

* **Acesse o quadro editável:** [Projeto Excalidraw](https://excalidraw.com/#json=x6FdPNApA_yV3laISkJz8,_ohCkifa8jM4Nqt12xw5PA)

---


#### 🔌 Endpoints da API

A API está documentada abaixo com seus respectivos métodos e responsabilidades:

| Recurso | Método | Rota | Descrição |
| :--- | :--- | :--- | :--- |
| **Categorias** | `GET` | `/category` | Lista todas as categorias cadastradas. |
| **Produtos** | `GET` | `/product` | Lista produtos (suporta `?name=...` para busca e `?page=...` para paginação). |
| **Produtos** | `GET` | `/product/:id` | Retorna os detalhes de um produto específico. |
| **Produtos** | `POST` | `/product` | Cadastra um novo produto (Requer `categoryId`). |
| **Produtos** | `PATCH` | `/product/:id` | Atualiza dados de um produto existente. |
| **Produtos** | `DELETE` | `/product/:id` | Remove um produto do sistema. |

---

#### ✅ Checklist de Requisitos Cumpridos

**Backend:**
- [x] Listagem de categorias (`GET /category`)
- [x] CRUD completo de produtos
- [x] Filtro de busca por nome (Case-insensitive)
- [x] Validação de preço (Não permite negativos)
- [x] Garantia de categoria obrigatória

**Frontend:**
- [x] Listagem responsiva
- [x] Filtro de busca integrado à URL
- [x] Formulários de criação e edição funcional
- [x] Feedback visual (Toasts/Sonner)
- [x] Paginação dinâmica

---

#### 🔗 Links
- **GitHub Repositório:** [Jonathan Rodrigues](https://github.com/Jhongamers)
- **LinkedIn:** [Jonathan Rodrigues](https://www.linkedin.com/in/jonathanrodriguescabr/)