import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";

export default function Index() {

  const [valorfinanciamento, setvalor] = useState("");
  const [parcela, setparcelas] = useState("");
  const [taxajuros, settaxajuros] = useState("");
  const [resultado, setresultado] = useState("");
  const [demaistaxas, setdemaistaxas] = useState("");

  const calcular = () => {
  const valor = parseFloat(valorfinanciamento);
  const parcelas = parseInt(parcela);
  const taxaJuros = parseFloat(taxajuros) / 100;
  const taxasExtras = parseFloat(demaistaxas);

  if (isNaN(valor) || isNaN(parcelas) || isNaN(taxaJuros) || isNaN(taxasExtras)) {
    setresultado("Por favor, preencha todos os campos corretamente.");
    return;
  }

  const taxaMensal = Math.pow(1 + taxaJuros, 1 / 12) - 1;
  const valorParcela = (valor * taxaMensal) / (1 - Math.pow(1 + taxaMensal, -parcelas));
  const totalPago = valorParcela * parcelas;
  const jurosPagos = totalPago - valor;
  const juroscomtaxa = jurosPagos + taxasExtras;

  setresultado(
    `Valor da Parcela: R$ ${valorParcela.toFixed(2)}\n` +
    `Total Pago: R$ ${totalPago.toFixed(2)}\n` +
    `Juros Pagos: R$ ${jurosPagos.toFixed(2)}\n` +
    `Juros com Taxas: R$ ${juroscomtaxa.toFixed(2)}`
  );
};

return (
  <View style={{ padding: 20 }}>
    <Text style={{ fontSize: 20, marginBottom: 20 }}>Calculadora de Financiamento</Text>
    <Text>Valor do Financiamento:</Text>
    <TextInput
      value={valorfinanciamento}
      onChangeText={setvalor}
      keyboardType="numeric"
      style={{ borderWidth: 1, marginBottom: 10, padding: 5
      }}
    />
    <Text>Número de Parcelas:</Text>
    <TextInput
      value={parcela}
      onChangeText={setparcelas}
      keyboardType="numeric"
      style={{ borderWidth: 1, marginBottom: 10, padding: 5
      }}
    />
    <Text>Taxa de Juros (% ao ano):</Text>
    <TextInput
      value={taxajuros}
      onChangeText={settaxajuros}
      keyboardType="numeric"
      style={{ borderWidth: 1, marginBottom: 10, padding: 5
      }}
    />
    <Text>Outras Taxas (R$):</Text>
    <TextInput
      value={demaistaxas}
      onChangeText={setdemaistaxas}
      keyboardType="numeric"
      style={{ borderWidth: 1, marginBottom: 10, padding: 5
      }}
    />
    <Button title="Calcular" onPress={calcular} />
    {resultado ? (
      <View style={{ marginTop: 20 }}>
        <Text>Resultado:</Text>
        <Text>{resultado}</Text>
      </View>
    ) : null}
  </View>
);
}