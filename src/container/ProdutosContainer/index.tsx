import * as React from "react";
import { connect } from "react-redux";

import Database from "../../boot/database";

import Produtos from "../../stories/screens/Produtos";
import { carregar, carregarPrecos, filtrarPorNome } from "./actions";
export interface Props {
	navigation: any;
	carregar: Function;
	carregarPrecos:Function;
	pesquisar: Function;
	dados: Array<any>;
	carregando: boolean;
}
export interface State {}
class ProdutoContainer extends React.Component<Props, State> {
	
	localDB = Database.getPouchDBInstance();
	
	componentDidMount() {
		const props = this.props;
		this.localDB.find({
			selector: {_id: { $gt: 'grupo:', $lt: 'grupoX' }},
			fields: ['itens']
		}).then(function (result) {
			if (result) {
				const produtos = [];
				result.docs.map(registro => produtos.push(...registro.itens));
				props.carregar(produtos);
			}
		}).catch(function (err) {
			console.log(err);
		});
		this.localDB.find({
			selector: {_id: { $gt: 'preco:', $lt: 'precoX' }},
			fields: ['itens']
		}).then(function (result) {
			if (result) {
				const precos = [];
				result.docs.map(registro => precos.push(registro));
				props.carregarPrecos(precos);
			}
		}).catch(function (err) {
			console.log(err);
		});	
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
		carregarPrecos: dados => dispatch(carregarPrecos(dados)),
		pesquisar: texto => dispatch(filtrarPorNome(texto)),
	};
}

const mapStateToProps = state => ({
	dados: state.produtosReducer.listaConsulta,
	carregando: state.produtosReducer.carregando,
});
export default connect(mapStateToProps, bindAction)(ProdutoContainer);
