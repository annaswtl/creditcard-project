// Função para validar o número do cartão de crédito usando o algoritmo de Luhn
function validarCartao(numeroCartao) {
    let soma = 0;
    let alternar = false;

    // Percorre o número do cartão de trás para frente
    for (let i = numeroCartao.length - 1; i >= 0; i--) {
        let digito = parseInt(numeroCartao[i]);

        if (alternar) { 
            digito *= 2;
            if (digito > 9) digito -= 9;
        }

        soma += digito;
        alternar = !alternar;
    }

    return soma % 10 === 0;
}

// Função para identificar a bandeira do cartão com base no prefixo
function identificarBandeira(numeroCartao) {
    const prefixos = {
        Visa: /^4[0-9]{12}(?:[0-9]{3})?$/, // Começa com 4
        MasterCard: /^5[1-5][0-9]{14}$/, // Série 51-55
        Amex: /^3[47][0-9]{13}$/, // Começa com 34 ou 37
        Discover: /^6(?:011|5[0-9]{2}|4[4-9][0-9])[0-9]{12}$/, // Começa com 6011, 65 ou 644-649
        Elo: /^(4011|4312|4389|4514|4576|5041|5066|5090|6277|6362)[0-9]*$/, // Prefixos Elo
    };

    for (const [bandeira, regex] of Object.entries(prefixos)) {
        if (regex.test(numeroCartao)) {
            return bandeira;
        }
    }

    return "Bandeira desconhecida";
}
// Exemplo de uso
const cardNumbers = [
    "4111111111111111", // Visa
    "5555555555554444", // MasterCard
    "378282246310005",  // Amex
    "6011111111111117", // Discover
    "4011780000000000"  // Elo
];

const cardNumber = "5277959558870483"; // Número específico para validação

if (validarCartao(cardNumber)) {
    console.log(`Cartão válido! Bandeira: ${identificarBandeira(cardNumber)}`);
} else {
    console.log("Cartão inválido!");
}

const result = validarCartao(cardNumber);
console.log(result);
