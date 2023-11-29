<p align="center">
  <h1 align="center">Desafio técnico FullStack CEFIS - FrontEnd</h1>
</p>

Aplicação desenvolvida como parte do desafio técnico FullStack proposto pela CEFIS. Consome dados a API construída também como parte do desafio.

### 👀 API 
* **BackEnd: <a href="https://github.com/LazaroHenrique3/desafio-fullstack-cefis-api/tree/main">Desafio FullStack - BackEnd</a>**

## 🛠️ Construído com

* **TypeScript**
* **Next.js**

* ##  🚀 Rodar o projeto localmente em sua máquina

### Requisitos

* **Node.js 16.17^**

### Instruções

1 - Clone o projeto 
  ```sh
   git clone https://github.com/LazaroHenrique3/desafio-fullstack-cefis-frontend.git
   cd desafio-fullstack-cefis-frontend
   ```

2 - Instalar dependências
 ```sh
   npm install
   ```

3 - Adicione as variáveis de ambiente

Renomeie o `.env.local.example` para `.env.local` e adicione os valores necessários.

Se estiver utilizando as configurações sugeridas na API, o seu `.env.local` ficará semelhante a isso:
 ```sh
   NEXT_PUBLIC_API_URL_BASE=http://localhost:5000
   ```

4 - Inicialize a aplicação
```sh
   npm run dev
   ```

Após a inicialização a aplicação estará disponivel no `http://localhost:3000`

