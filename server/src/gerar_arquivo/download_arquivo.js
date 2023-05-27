const downloadArquivo = (function () {
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
        let blob = new Blob([data], {type: "octet/stream"});
        let url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

const nomeArquivo = "nome_arquivo";
const extensao = ".REM";
let conteudo = "";

const linhas = [
    "Linha 1\r\n",
    "Linha 2\r\n",
    "Linha 3\r\n"
];

linhas.forEach(linha => {
    conteudo += linha;
});

downloadArquivo(conteudo, nomeArquivo + extensao);