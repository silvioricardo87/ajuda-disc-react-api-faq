import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

function App() {
  // Inicializa state para armazenar os dados
  const [faq, setFAQ] = useState("");

  useEffect(() => {
    // Assumo que o componente esta montado
    let criado = true;

    // Carrego os dados
    const loadData = async () => {
      const response = await axios.get(
        `https://poc.metasix.solutions/parse/classes/FAQ`,
        {
          headers: {
            "X-Parse-Application-Id": "br.com.metasix.poc"
          }
        }
      );

      // Verifica se o componente continua sendo montado
      if (criado) {
        setFAQ(response.data.results);
      }
    };
    loadData();

    return () => {
      // Finalizado, seto variavel como falso
      criado = false;
    };
  });

  if (!faq) {
    return <div>Carregando dados...</div>;
  }

  return (
    <div className="App">
      <h1>API FAQ</h1>
      <ul>
        {faq.map(itens => (
          <div>
            <li key={itens.objectId}>
              <strong>{itens.question}</strong>
              <br />
              {itens.answer}
            </li>
            <br />
          </div>
        ))}
      </ul>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
