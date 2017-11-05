const initialState = {
	listaProdutos: [],
	listaConsulta: [],
	carregando: true,
};

export default function(state = initialState, action) {
	if (action.type === "PRODUTOS_CARREGAR_LISTA") {
		return {
			...state,
			listaProdutos: action.lista,
			listaConsulta: action.lista.filter((_value, index) => { return index < 20 }),
			carregando: false,
		};
	}
	if (action.type === "PRODUTOS_NOTIFICAR_CARREGANDO") {
		return {
			...state,
			carregando: action.carregando,
		};
	}
	if (action.type === "PRODUTOS_FILTRAR_POR_NOME") {
		return {
			...state,
			listaConsulta: 
				(action.texto === '' 
				? state.listaProdutos.filter((_value, index) => { return index < 20 })
					: state.listaProdutos.filter(produto => 
						produto.desc.toUpperCase().indexOf(action.texto.toUpperCase()) >= 0).filter((_value, index) => index < 40)
				),
			carregando: false,
		};
	}
	return state;
}
