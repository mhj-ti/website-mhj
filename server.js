const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configuração do nodemailer (você precisará configurar com suas credenciais)
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // ou seu servidor SMTP
  port: 587,
  secure: false,
  auth: {
    user: 'seu-email@gmail.com', // SUBSTITUA com seu email
    pass: 'sua-senha-app' // SUBSTITUA com senha de app do Gmail
  }
});

// Rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API para envio de formulário de contato
app.post('/api/contato', async (req, res) => {
  const { nome, email, telefone, assunto, cidade, mensagem } = req.body;

  // Validação básica
  if (!nome || !email || !telefone || !assunto || !cidade || !mensagem) {
    return res.status(400).json({ 
      success: false, 
      message: 'Todos os campos são obrigatórios' 
    });
  }

  // Validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Email inválido' 
    });
  }

  try {
    // Configurar email
    const mailOptions = {
      from: email,
      to: 'contato@mhjti.com.br', // SUBSTITUA com o email da MHJ TI
      subject: `Contato Site MHJ TI - ${assunto}`,
      html: `
        <h2>Novo contato através do site</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${telefone}</p>
        <p><strong>Assunto:</strong> ${assunto}</p>
        <p><strong>Cidade:</strong> ${cidade}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem}</p>
      `
    };

    // Enviar email
    await transporter.sendMail(mailOptions);

    res.json({ 
      success: true, 
      message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.' 
    });

  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao enviar mensagem. Tente novamente mais tarde.' 
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
