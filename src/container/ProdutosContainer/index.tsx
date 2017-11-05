import * as React from "react";
import { connect } from "react-redux";

import Database from "../../boot/database";

import Produtos from "../../stories/screens/Produtos";
import { carregar, filtrarPorNome } from "./actions";
export interface Props {
	navigation: any;
	carregar: Function;
	pesquisar: Function;
	dados: Array<any>;
	carregando: boolean;
}
export interface State {}
class PedidoContainer extends React.Component<Props, State> {
	
	localDB = Database.getPouchDBInstance();
	
	componentDidMount() {
	}

	render() {
		return <Produtos
				navigation={this.props.navigation}
				dados={this.props.dados}
				pesquisar={this.props.pesquisar}
				carregando={this.props.carregando}/>;
	}
}

function bindAction(dispatch) {
	return {
		carregar: dados => dispatch(carregar(dados)),
		pesquisar: texto => dispatch(filtrarPorNome(texto)),
	};
}

const mapStateToProps = state => ({
	dados: state.pedidoReducer.listaConsulta,
	carregando: state.pedidoReducer.carregando,
});
export default connect(mapStateToProps, bindAction)(PedidoContainer);
