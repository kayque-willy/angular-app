//Execução no terminal: $> node .\gerar_arquivo.js

// [Flags]:
// r   Somente leitura
// r+  Leitura e escrita
// rs  Leitura de modo síncrono
// rs+ Leitura e escrita de modo síncrono
// w   Escrita, cria um novo arquivo se não existir
// wx  Como o w, mas falha se o arquivo não existir
// w+  Leitura e Escrita e cria o novo arquivo se não existir
// wx+ Como o wx, mas falha se o arquivo não existir
// a   Escrita no final do arquivo
// ax  Como o a, mas falha se o arquivo não existir
// a+  Escrita no final do arquivo, cria um novo arquivo se não existir

const fileSystem = require('fs');

const nomeArquivo = "nome_arquivo";
const extensao = ".REM";
const diretorio = "./";
let conteudo = "";

const linhas = [
    "Linha 1\n",
    "Linha 2\n",
    "Linha 3\n"
];

linhas.forEach(linha => {
    conteudo += linha;
});

//Criaçao do arquivo
fileSystem.writeFileSync(diretorio + nomeArquivo + extensao, conteudo, { flag: 'a+' });

console.log(nomeArquivo + extensao + " gerado!");

//Leitura do arquivo criado
const arquivoLido = fileSystem.readFileSync(diretorio + nomeArquivo + extensao, { flag: 'a+' });

console.log("Conteúdo do arquivo:\n" + arquivoLido);
