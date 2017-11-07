export function notificarCarregando(bool: boolean) {
	return {
		type: "PRODUTOS_NOTIFICAR_CARREGANDO",
		carregando: bool,
	};
}
export function carregarLista(lista: Object) {
	return {
		type: "PRODUTOS_CARREGAR_LISTA",
		lista,
	};
}
export function carregarListaPrecos(lista: Object) {
	return {
		type: "PRECOS_CARREGAR_LISTA",
		lista,
	};
}
export function carregar(dados) {
	return dispatch => {
		dispatch(notificarCarregando(true));
		dispatch(carregarLista(dados));
	};
}
export function carregarPrecos(dados) {
	return dispatch => {
		dispatch(notificarCarregando(true));
		dispatch(carregarListaPrecos(dados));
	};
}
export function filtrarPorNome(texto) {
	return dispatch => {
		dispatch(notificarCarregando(true));
		dispatch({
			type: "PRODUTOS_FILTRAR_POR_NOME",
			texto,
		});
	};
}
