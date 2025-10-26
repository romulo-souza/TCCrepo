const express = require("express");
const app = express();
const port = 3000;

// Função para gerar string de tamanho aproximado em 1 KB 
function gerarString(tamanhoKB) {
    const tamanhoBytes = tamanhoKB * 1024 // converte para bytes
    const base = "X".repeat(1024); // 1 KB aproximado (1 char = 1 byte em UTF-8)
    let resultado = "";

    while (resultado.length < tamanhoBytes) {
        resultado += base;
    }

    // Corta a string para o tamanho exato
    return resultado.slice(0, tamanhoBytes);
}

app.get("/data/:tamanhoKB", (req, res) => {
    const tamanhoKB = parseInt(req.params.tamanhoKB, 10);

    if (isNaN(tamanhoKB) || tamanhoKB <= 0) {
        return res.status(400).json({ error: "Tamanho inválido" });
    }

    const resposta = {
        tamanhoKB: tamanhoKB,
        data: gerarString(tamanhoKB),
    };
    const tamanhoBytes = Buffer.byteLength(JSON.stringify(resposta), "utf8");
    console.log(`Tamanho do JSON: ${tamanhoBytes} bytes`);
    res.json(resposta);
});

// (0.0.0.0) servidor escuta todas as interfaces do PC, local e rede
app.listen(port, '0.0.0.0', () => {
    console.log(`API rodando em http://192.168.15.3:${port}`);
});

