export default function () {
  const brazilianCurrency = (value) => {
    return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
  }

  return { brazilianCurrency }
}