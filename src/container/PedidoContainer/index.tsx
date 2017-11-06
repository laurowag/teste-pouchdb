import * as React from "react";
import { connect } from "react-redux";

import uuid from  'react-native-uuid';

import Database from "../../boot/database";

import Pedido from "../../stories/screens/Pedido";
import { carregar, filtrarPorNome } from "./actions";
export interface Props {
	navigation: any;
	carregar: Function;
	pesquisar: Function;
	pedido: any;
	isLoading: boolean;
	listaClientes: Array<any>;	
}
export interface State {}
class PedidoContainer extends React.Component<Props, State> {
	
	localDB = Database.getPouchDBInstance();

	constructor() {
		super();		
	}
	
	componentDidMount() {
			
	}

	onSelecionarCliente(itemValue: any) {
		const obj = {idcli: itemValue};
		console.log(obj);
	}

	onAlterarCampo(campo: string, valor: any) {
		const obj = {};
		obj[campo] = valor;
		console.log(obj);
	}

	criarPedido() {
		const pedido = {
			_id: 'proposta:'+uuid.v4(),
			idemp: '1',
			referencia: 'proposta:01',
			dataemi: '2017-11-01',
			idcli: '1',
			cliente: 'Nome do cliente',
			idend: '1',
			idttr: '1',
			obssit: 'Em criação',
			sit: '1',
			frete: '0',
			desc: '0',
			obs: 'Teste de obs',
			vcto: '2018-04-30',
			itens: [
				{ idprod: '1',
					produto: 'Descrição do produto',
					qtd: '1',
					descv: '0',
					preco: '10',
					custo: '5',
					frete: '0',
					descrat: '0',
				}
			],
		};
		this.localDB.put(pedido).then(res => console.log(res)).catch(error => console.log(error));
	}

	render() {
		return <Pedido
				navigation={this.props.navigation}
				pedido={this.props.pedido}
				listaClientes={this.props.listaClientes}
				onSelecionarCliente={this.onSelecionarCliente.bind(this)}
				onAlterarCampo={this.onAlterarCampo.bind(this)}
				onCriar={this.criarPedido.bind(this)}
				/>;
	}
}

function bindAction(dispatch) {
	return {
		carregar: dados => dispatch(carregar(dados)),
		pesquisar: texto => dispatch(filtrarPorNome(texto)),
	};
}

const mapStateToProps = state => ({
	pedido: state.pedidoReducer.pedido,
	listaClientes: state.clientesReducer.listaClientes,
});
export default connect(mapStateToProps, bindAction)(PedidoContainer);
