import { useEffect, useState } from "react";

export default function App() {
  // Estado para armazenar a lista de compras
  const [listaCompras, setListaCompras] = useState([]);

  // Estado para armazenar o valor do item sendo digitado
  const [item, setItem] = useState("");

  // Função para adicionar um item à lista de compras
  const adicionarItem = () => {
    if (item.trim() !== "") {
      // Verifica se o item não está vazio ou contém apenas espaços em branco
      setListaCompras([...listaCompras, item]); // Adiciona o item à lista de compras
      setItem(""); // Limpa o campo de entrada
    }
  };

  const saveLocalStorage = () => {
    const listaString = JSON.stringify(listaCompras)
    localStorage.setItem('lista', listaString)
  }

  /* listaCompras.length > 0 && saveLocalStorage()
  //atualiza o localstorage em tempo real */

  const getItensLocalStorage = () => {
    //pega do localStorage
    const listaLocalStorage = localStorage.getItem('lista')
    //transforma de string p/ array
    const listaArray = JSON.parse(listaLocalStorage)
    //atualiza o estado com o arrey carregado
    //listaArray só retorna true se tiver conteudo se não não faz o set
    //e não atualiza o listaCompras
    listaArray && setListaCompras(listaArray) // curto circuito
  }

  //executado uma unica vez
  useEffect(() => {
    getItensLocalStorage()
  }, [])

  //executado sempre que for adicionado na lista
  useEffect(() => {
    listaCompras.length > 0 && saveLocalStorage()
  }, [listaCompras])

  const limpaStorage = () => {
    localStorage.removeItem('lista')
    setListaCompras([])
  }

  return (
    <div>
      <h1>Lista de Compras</h1>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Digite um item"
      />
      <button onClick={adicionarItem}>Adicionar</button>
      <button onClick={limpaStorage}>Limpa Storage</button>
      {/* <button onClick={getItensLocalStorage}>Carragar LocalStorage</button>
      <button onClick={saveLocalStorage}>Salvar</button> */}

      <ul>
        {listaCompras.map((compra, index) => (
          <li key={index}>{compra}</li>
        ))}
      </ul>
    </div>
  );
}
