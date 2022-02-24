#### TECNOLOGIAS APLICADAS

| DESCRIÇÃO  | VERSÃO     |                                           |
| ---------- | ---------- | ----------------------------------------- |
| Next JS    | `v12.0.10` | [Leia +](https://nextjs.org/docs)         |
| Nest JS    | `v8.1.1`   | [Leia +](https://docs.nestjs.com/)        |
| Typescript | `v4.5.5`   | [Leia +](https://www.typescriptlang.org/) |
| Graphql    | `v16.3.0`  | [Leia +](https://graphql.org/code/)       |
| Apollo     | `v2.2.9`   | [Leia +](https://www.apollographql.com/)  |
| Formik     | `v2.2.9`   | [Leia +](https://formik.org/)             |

### EXECUTANDO O PROJETO

Para executar o projeto, siga essencialmente estes passos:

- Clone este respositório:
  `git clone https://github.com/jhordanjes/wa`
- Navegue até o diretório _webapp_:
  `cd webapp`

- Execute o seguinte comando para inicializar o frontend:
  `yarn dev`

- Acesse a rota `http://localhost:3000/` para o frontend.

- Execute o seguinte comando para inicializar o backend:
  `yarn start:dev`

- Acesse a rota `http://localhost:3001/graphql` para o backend:

<img src="https://github.com/jhordanjes/wa/blob/main/imgs/students.png">

- Para testar as funcionalidades da API use as sequintes _queries_ ou _mutations_;

  - **createUser** – para testar a função de criação, use esse trecho como exemplo:

  ````
  	 mutation {
  	   createUser(
  	     user: {
  	        name:"Joao da Silva",
            email: "gabrielll@gmail.com",
            cpf: "96475528072"
  	     }) {
  	     name
  	     sku
  	   }
  	}
  	 ```
  ````

    <img src="https://github.com/jhordanjes/wa/blob/main/imgs/createUser.png">

  - **users** – para obter todos os alunos cadastrados, execute:

  ````
  	query {
  		users(filters: {}) {
  			sku
  			name
  			email
  			cpf
  		}
  	}
  	```
  ````

  Além disso, caso queira filtrar por algo específico ou passar alguma condição de retorno, insira como parâmetro do _filter_ conforme exemplificado abaixo:

  ````
  	query {
  		users(filters: { name: "Joao da Silva" }) {
  			sku
  			name
  			email
  			cpf
  		}
  	}
  	```
  ````

  <img src="https://github.com/jhordanjes/wa/blob/main/imgs/getUsers.png">

  - **removeUser** – para deletar um aluno basta enviar o código identificador como parâmetro.

  ```
   mutation {
  	removeUser(sku: code_id)
   }
  ```

  <img src="https://github.com/jhordanjes/wa/blob/main/imgs/removeUser.png">

_Desenvolvido por [Jhordan Oliveira](https://github.com/jhordanjes)._
