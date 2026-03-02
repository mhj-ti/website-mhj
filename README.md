# MHJ TI - Site Institucional

Site moderno e responsivo para MHJ TI - Infraestrutura & Suporte de TI

## 🚀 Características

- ✅ Design moderno inspirado no StayBox
- ✅ Backend Node.js/Express funcional
- ✅ Formulário de contato com envio de email
- ✅ Totalmente responsivo (mobile, tablet, desktop)
- ✅ Animações suaves e interativas
- ✅ Scroll suave entre seções
- ✅ Validação de formulário em tempo real
- ✅ Cores e identidade MHJ TI

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🔧 Instalação

1. **Clone ou baixe os arquivos do projeto**

2. **Instale as dependências:**
```bash
cd mhjti-website
npm install
```

3. **Configure o email (IMPORTANTE):**

Abra o arquivo `server.js` e configure suas credenciais de email:

```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // ou seu servidor SMTP
  port: 587,
  secure: false,
  auth: {
    user: 'seu-email@gmail.com', // SUBSTITUA aqui
    pass: 'sua-senha-app' // SUBSTITUA aqui
  }
});
```

**Para Gmail:**
- Use uma "Senha de App" (não sua senha normal)
- Ative a verificação em 2 etapas
- Gere uma senha de app em: https://myaccount.google.com/apppasswords

Também altere o email de destino:
```javascript
to: 'contato@mhjti.com.br', // SUBSTITUA com seu email
```

## ▶️ Como rodar

### Modo Desenvolvimento:
```bash
npm run dev
```

### Modo Produção:
```bash
npm start
```

O site estará disponível em: **http://localhost:3000**

## 📁 Estrutura do Projeto

```
mhjti-website/
├── public/
│   ├── css/
│   │   └── style.css          # Estilos do site
│   ├── js/
│   │   └── script.js          # JavaScript interativo
│   └── index.html             # HTML principal
├── server.js                  # Backend Node.js/Express
├── package.json               # Dependências
└── README.md                  # Este arquivo
```

## 🎨 Personalização

### Cores
Edite as variáveis CSS em `public/css/style.css`:
```css
:root {
    --primary-color: #0066cc;      /* Azul principal */
    --primary-dark: #004999;       /* Azul escuro */
    --secondary-color: #00b4d8;    /* Azul secundário */
    --accent-color: #ff6b35;       /* Cor de destaque */
}
```

### Logo
Substitua o texto da logo no `index.html` por uma imagem:
```html
<div class="logo">
    <img src="img/logo.png" alt="MHJ TI">
</div>
```

### Conteúdo
- **Serviços**: Edite a seção `#servicos-destaque` no `index.html`
- **Sobre**: Modifique a seção `#quem-somos`
- **Contato**: Atualize telefone e endereço na seção `#contato`

### Imagens
Adicione suas imagens na pasta `public/img/` e referencie no HTML

## 📱 Redes Sociais

Atualize os links no footer do `index.html`:
```html
<a href="https://facebook.com/suapagina" target="_blank">
    <i class="fab fa-facebook"></i>
</a>
```

## 🚀 Deploy

### Opções de hospedagem:

1. **Vercel** (Recomendado - Grátis)
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Heroku**
   ```bash
   heroku create mhjti-site
   git push heroku main
   ```

3. **Railway** (https://railway.app)
4. **Render** (https://render.com)

## 🔒 Segurança

- **NUNCA** commite credenciais de email no código
- Use variáveis de ambiente para produção:
  ```javascript
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS
  ```

## 📝 Checklist de Deploy

- [ ] Configurar credenciais de email
- [ ] Atualizar telefone e endereço
- [ ] Adicionar logo personalizada
- [ ] Testar formulário de contato
- [ ] Adicionar Google Analytics (opcional)
- [ ] Configurar domínio personalizado
- [ ] Testar em diferentes dispositivos

## 🆘 Suporte

Para problemas ou dúvidas:
- Verifique o console do navegador (F12)
- Verifique os logs do servidor
- Teste o formulário em localhost primeiro

## 📄 Licença

Este projeto foi desenvolvido para MHJ TI.

---

**Desenvolvido com ❤️ para MHJ TI**
