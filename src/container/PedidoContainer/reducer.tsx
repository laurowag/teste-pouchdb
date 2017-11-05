const initialState = {
	pedido: {
		itens: [
			{produto: 'Prod1'},
			{produto: 'Prod2'},
		],
		situacoes: [
			{situacao: 'Criado', data: '2017-10-31 10:00:00-0300'},
			{situacao: 'Finalizado', data: '2017-10-31 12:00:00-0300'},
		],
	},
};

export default function(state = initialState, action) {
	if (action.type === "PRODUTOS_CARREGAR_LISTA") {
		return {
			...state,
			listaProdutos: action.lista,
			listaConsulta: action.lista.filter((_value, index) => { return index < 20 }),
			isLoading: false,
		};
	}	
	return state;
}
