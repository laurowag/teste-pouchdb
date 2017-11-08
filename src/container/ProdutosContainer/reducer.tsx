const initialState = {
	listaProdutos: [],
	listaConsulta: [],
	listaPrecos: [],
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
	if (action.type === "PRECOS_CARREGAR_LISTA") {
		return {
			...state,
			listaPrecos: action.lista,			
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
		let produtos = (action.texto === '' 
				? state.listaProdutos.filter((_value, index) => { return index < 20 })
					: state.listaProdutos.filter(produto => 
						produto.desc.toUpperCase().indexOf(action.texto.toUpperCase()) >= 0).filter((_value, index) => index < 40)
				);
		produtos = produtos.map(item => {
			item.precos = state.listaPrecos.reduce((previousValue, currentValue) => {
				return previousValue + currentValue.itens.filter(itempreco => itempreco.prod === item.id).length
			}, 0);
			return item;
		});
		return {
			...state,
			listaConsulta: produtos,
			carregando: false,
		};
	}
	return state;
}
