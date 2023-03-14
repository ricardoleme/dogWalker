# 🐕 Projeto Mobile DogWalker

Projeto em Expo/React Native que implementa um pequeno CRUD.

> ⚠️ **Projeto utilizado nas aulas da disciplina de Programação para Dispositivos Móveis da [Fatec Itu](fatecitu.edu.br)**

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=Apache&color=FB724C&labelColor=FFFFFF">
<a href="https://fatecitu.edu.br" target="_blank">
  <img alt="License" src="https://img.shields.io/static/v1?label=Powered+by&message=Fatec+Itu&color=FB724C&labelColor=FFFFFF">
  </a>
</p>
<p align="center">
<img alt="iOS" src="https://img.shields.io/badge/iOS-999999.svg?style=for-the-badge&logo=iOS&logoColor=fff"> 
<img alt="Android" src="https://img.shields.io/badge/Android-A4C639.svg?style=for-the-badge&logo=Android&logoColor=black"> 
  <img alt="JS" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
</p>

# 🧠 Contexto

Uma das dificuldades dos desenvolvedores de é implementar um pequeno CRUD que possua autenticação, sem antes se envolver em um framework web, como o Vue, Angular ou React.
O propósito desse pequeno sistema é mostrar que é possível desenvolvermos uma aplicação 100% na nuvem, utilizando apenas HTML, CSS e Javascript.
## 📋 Instruções

- [ ] Inicialmente clone o projeto; 
- [ ] Instale as dependências com ```npm i```
- [ ] Inicie o projeto com ```npx expo start```


## 🌐 Veja uma demonstração online do projeto. 



## 📷 Imagens do Projeto
<table>
<tr>
<td><img src="screenshots/inicio.jpg" alt="Interface Inicial" width="600"></td>
<td><img src="screenshots/login.jpg" alt="Interface de Login" width="600"></td>
</tr>
<tr>
<td><img src="screenshots/menu.jpg" alt="Interface do Menu" width="600"></td>
<td><img src="screenshots/detalhe.jpg" alt="Interface do Detalhe do Passeador" width="600"></td>
</tr>
</table>


## 💬 Contato

Prof. Ms. Ricardo Leme <br>
<a href="https://www.linkedin.com/in/ricardo-leme/" target="_blank">
  <img alt="Linkedin" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">
</a>
<a href="mailto:ricardo.leme@fatec.sp.gov.br" target="_blank">
  <img alt="Linkedin" src="https://img.shields.io/badge/Microsoft_Outlook-0078D4?style=for-the-badge&logo=microsoft-outlook&logoColor=white">
</a>

## 📝 Licença

Esse projeto está sob a licença Apache. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
---
Made with 💜, HTML, CSS and only Vanilla JS. 
---
## ⚠️Erros no Swiper

Vá até node_modules/react-native-swiper/index.js
Substitua as linhas:
```
module.exports = Swiper;
module.exports.default = Swiper;
```
por:
```
export default Swiper
export {Swiper}
```