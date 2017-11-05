const initialState = {
	listaClientes: [],
	listaConsulta: [],
	carregando: true,
};

export default function(state = initialState, action) {
	if (action.type === "CLIENTES_CARREGAR_LISTA") {
		return {
			...state,
			listaClientes: action.lista,
			listaConsulta: action.lista.filter((_value, index) => { return index < 20 }),
			carregando: false,
		};
	}
	if (action.type === "CLIENTES_NOTIFICAR_CARREGANDO") {
		return {
			...state,
			carregando: action.carregando,
		};
	}
	if (action.type === "CLIENTES_FILTRAR_POR_NOME") {
		return {
			...state,
			listaConsulta: 
				(action.texto === '' 
					? state.listaClientes.filter((_value, index) => { return index < 20 })
					: state.listaClientes.filter(cliente => cliente.nome.toUpperCase().indexOf(action.texto.toUpperCase()) >= 0)
				),
			carregando: false,
		};
	}
	return state;
}
