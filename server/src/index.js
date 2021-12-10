const express = require('express');
// const cors = require('cors');
const multiparty = require('connect-multiparty');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//O cors é usado para permitir chamadas nas portas do localhost, que por padrão, são bloqueadas por segurança
//Caso esteja usando o arquivo de proxy nas configurações do package.json, o cors não é necessário
// const corsOptions = {
//   origin: '*',
//   optionsSucessStatus: 200
// }
// app.use(cors(corsOptions));

const mutipartMiddleware = multiparty({ uploadDir: './uploads' })
app.post('/upload', mutipartMiddleware, (req, res) => {
  const files = req.files;
  console.log(files);
  res.json({ message: files });
});

app.use((err, req,res,next)=> res.json({error: err.message}));

app.listen(8000, () => {
  console.log('Servidor porta 8000');
});
