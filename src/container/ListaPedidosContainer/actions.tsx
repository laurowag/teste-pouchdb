export function notificarCarregando(bool: boolean) {
	return {
		type: "PEDIDOS_NOTIFICAR_CARREGANDO",
		isLoading: bool,
	};
}
export function carregarLista(listaPendentes: Object, listaEmAnalise: Object, listaConcluidos: Object) {
	return {
		type: "PEDIDOS_CARREGAR_LISTA",
		listaPendentes,
		listaEmAnalise,
		listaConcluidos,
	};
}
export function carregar(listaPendentes, listaEmAnalise, listaConcluidos) {
	return dispatch => {
		dispatch(notificarCarregando(true));
		dispatch(carregarLista(listaPendentes, listaEmAnalise, listaConcluidos));
	};
}