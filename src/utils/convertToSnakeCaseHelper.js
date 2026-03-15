module.exports = (objetoParams) =>{
    const novoObjeto = {};

    const toSnakeCase = (str) =>
    str
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .toLowerCase();

    for(let propriedade in objetoParams){
       novoObjeto[toSnakeCase(propriedade)] = objetoParams[propriedade];
    }
    return novoObjeto;
};