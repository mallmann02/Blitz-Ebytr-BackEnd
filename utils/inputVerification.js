const titleVerification = (title) => {
  if (title.length > 30 || title.length < 5 ) return false;
  return true;
};

const statusVerification = (status) => {
  if (
    status !== 'em andamento'
  || status !== 'pendente'
  || status !== 'pronto') {
    return false;
  }
  return true;
};

const inputsVerification = (title, status) => {
  if (!titleVerification(title)) return ({
    message: '"Título" deve possuir mais de 5 e menos de 30 caracteres'
  });

  if (!statusVerification(status)) return ({
    message: '"Status" deve ser igual a "em andamento", "pendente" ou "pronto"'
  });

  return { message: '' };
}

module.exports = {
  inputsVerification,
}