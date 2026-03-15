module.exports = (cpf) => {
    if (cpf.length !== 11) {
        return false;
    }

    // Rejeita CPFs com todos os dígitos iguais (ex: 111.111.111-11)
    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    // Valida primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }
    let primeiroDigito = (soma * 10) % 11;
    if (primeiroDigito === 10 || primeiroDigito === 11) primeiroDigito = 0;
    if (primeiroDigito !== parseInt(cpf[9])) {
        return false;
    }

    // Valida segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }
    let segundoDigito = (soma * 10) % 11;
    if (segundoDigito === 10 || segundoDigito === 11) segundoDigito = 0;
    if (segundoDigito !== parseInt(cpf[10])) {
        return false;
    }

    return true;
};