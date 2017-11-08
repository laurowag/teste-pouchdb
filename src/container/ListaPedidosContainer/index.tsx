import * as React from "react";
import { connect } from "react-redux";
import _ from 'lodash';
import uuid from  'react-native-uuid';

import Database from "../../boot/database";

import ListaPedidos from "../../stories/screens/ListaPedidos";
import { carregar } from "./actions";
export interface Props {
	navigation: any;
	carregar: Function;
	pesquisar: Function;
	pedido: any;
	isLoading: boolean;
	listaPendentes: Array<any>;
	listaEmAnalise: Array<any>;
	listaConcluidos: Array<any>;
}
export interface State {
	itemSelecionado: any;
}
class ListaPedidosContainer extends React.Component<Props, State> {
	
	localDB = Database.getPouchDBInstance();

	constructor() {
		super();
		this.state = {itemSelecionado: {}};
	}
	
	componentDidMount() {
		console.log('carregou');
		this.carregarLista();
	}

	carregarLista() {
		const x = this;
		this.localDB.find({
			selector: {_id: { $gt: 'proposta:', $lt: 'propostaX' }}
		}).then(function (result) {			
			const listaPendentes = result.docs.filter(pedido => (pedido.sit === '0' || pedido.sit === '2'));
			const listaEmAnalise = result.docs.filter(pedido => pedido.sit === '1');
			const listaConcluidos = result.docs.filter(pedido => (pedido.sit !== '0' && pedido.sit !== '1' && pedido.sit !== '2'));
			x.props.carregar(listaPendentes, listaEmAnalise, listaConcluidos);
		}).catch(function (err) {
			console.log(err);
		});
	}

	criarPedido() {
		const pedido = {
			_id: 'proposta:'+uuid.v4(),
			idemp: '1',
			referencia: 'proposta:01',
			dataemi: '2017-11-01',
			dataent: '2017-11-01',
			idcli: '1',
			idend: '1',
			idttr: '23',
			obssit: 'Em criação',
			sit: '0',
			frete: '0',
			desc: '0',
			obs: 'Teste de obs',
			dvcto: '2018-04-30',
			usuario: 'lauro',
			cfop: '5102A',
			idm: 'R$',
			itens: [
				{ 
					idprod: '2710',
					idcult: '6',
					idv1: '203',
					iduv1: '248',
					produto: 'Descrição do produto',
					qtd: '1',
					descv: '0',
					preco: '10',
					custo: '5',
					frete: '0',
					descrat: '0',
					idipr: '74791',
					idemb: '',
				}
			],
		};
		this.localDB.put(pedido).then(res => console.log(res)).catch(error => console.log(error));
		this.carregarLista();
	}

	enviarPedido() {
		if (this.state.itemSelecionado) {
			if ((this.state.itemSelecionado.sit === '0') || (this.state.itemSelecionado.sit === '2')) {
				this.setState({itemSelecionado: _.merge(this.state.itemSelecionado, {sit: '1', obssit: 'Em análise', erro: ''})});
				this.localDB.put(this.state.itemSelecionado).then(() => this.setState({itemSelecionado: {}}));
				this.carregarLista();
			}
		}
	}

	selecionarItem(itemId: any) {
		let itens = this.props.listaPendentes.filter(item => item._id === itemId);
		if (itens.length === 1) {
			this.setState({itemSelecionado: itens[0]});
		} else {
			itens = this.props.listaEmAnalise.filter(item => item._id === itemId);
			if (itens.length === 1) {
				this.setState({itemSelecionado: itens[0]});
			} else {
				itens = this.props.listaConcluidos.filter(item => item._id === itemId);
				if (itens.length === 1) {
					this.setState({itemSelecionado: itens[0]});
				}				
			}
		}
	}

	render() {
		return <ListaPedidos
				navigation={this.props.navigation}
				itemSelecionado={this.state.itemSelecionado}
				listaPendentes={this.props.listaPendentes}
				listaEmAnalise={this.props.listaEmAnalise}
				listaConcluidos={this.props.listaConcluidos}
				onSelecionarItem={this.selecionarItem.bind(this)}
				onCriar={this.criarPedido.bind(this)}
				onEnviar={this.enviarPedido.bind(this)}
				/>;
	}
}

function bindAction(dispatch) {
	return {
		carregar: (listaPendentes, listaAEnviar, listaConcluidos) => dispatch(carregar(listaPendentes, listaAEnviar, listaConcluidos)),		
	};
}

const mapStateToProps = state => ({
	listaPendentes: state.listaPedidosReducer.listaPendentes,
	listaEmAnalise: state.listaPedidosReducer.listaEmAnalise,
	listaConcluidos: state.listaPedidosReducer.listaConcluidos,
});
export default connect(mapStateToProps, bindAction)(ListaPedidosContainer);
