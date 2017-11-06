import * as React from "react";
import { connect } from "react-redux";

import Database from "../../boot/database";

import Clientes from "../../stories/screens/Clientes";
import { carregar, filtrarPorNome } from "./actions";
export interface Props {
	navigation: any;
	carregar: Function;
	pesquisar: Function;
	dados: Array<any>;
}
export interface State {}
class ClientesContainer extends React.Component<Props, State> {
	
	localDB = Database.getPouchDBInstance();
	
	componentDidMount() {
		const props = this.props;
		this.localDB.find({
			selector: {_id: { $gt: 'cliente:', $lt: 'clienteX' }},
			fields: ['itens']
		}).then(function (result) {
			if (result) {
				const clientes = [];
				result.docs.map(registro => clientes.push(...registro.itens.filter(cliente => (!cliente.vendedor || cliente.vendedor === '*' || cliente.vendedor.indexOf('lauro;') >= 0))));
				props.carregar(clientes);
			}
		}).catch(function (err) {
			console.log(err);
		});				
	}

	render() {
		return <Clientes navigation={this.props.navigation} dados={this.props.dados} pesquisar={this.props.pesquisar}/>;
	}
}

function bindAction(dispatch) {
	return {
		carregar: dados => dispatch(carregar(dados)),
		pesquisar: texto => dispatch(filtrarPorNome(texto)),
	};
}

const mapStateToProps = state => ({
	dados: state.clientesReducer.listaConsulta,
	carregando: state.homeReducer.carregando,
});
export default connect(mapStateToProps, bindAction)(ClientesContainer);
