import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import homeReducer from "../container/HomeContainer/reducer";
import clientesReducer from "../container/ClientesContainer/reducer";
import produtosReducer from "../container/ProdutosContainer/reducer";
import pedidoReducer from "../container/PedidoContainer/reducer";
import listaPedidosReducer from "../container/ListaPedidosContainer/reducer";

export default combineReducers({
	form: formReducer,
	homeReducer,
	clientesReducer,
	produtosReducer,
	pedidoReducer,
	listaPedidosReducer,
});
