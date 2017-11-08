const initialState = {
	listaPendentes: [],
	listaEmAnalise: [],
	listaConcluidos: [],
};

export default function(state = initialState, action) {
	if (action.type === "PEDIDOS_CARREGAR_LISTA") {
		return {
			...state,
			listaPendentes: action.listaPendentes,
			listaEmAnalise: action.listaEmAnalise,
			listaConcluidos: action.listaConcluidos,
			isLoading: false,
		};
	}	
	return state;
}
