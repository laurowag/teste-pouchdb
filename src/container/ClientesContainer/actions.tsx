export function notificarCarregando(bool: boolean) {
	return {
		type: "CLIENTES_NOTIFICAR_CARREGANDO",
		carregando: bool,
	};
}
export function carregarLista(lista: Object) {
	return {
		type: "CLIENTES_CARREGAR_LISTA",
		lista,
	};
}
export function carregar(dados) {
	return dispatch => {
		dispatch(notificarCarregando(true));
		dispatch(carregarLista(dados));
	};
}
export function filtrarPorNome(texto) {
	return dispatch => {
		dispatch(notificarCarregando(true));
		dispatch({
			type: "CLIENTES_FILTRAR_POR_NOME",
			texto,
		});
	};
}
