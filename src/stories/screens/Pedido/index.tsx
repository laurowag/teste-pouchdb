import * as React from "react";
import { Container, Header, Title, Button, Icon, Left, Right, Body, Tabs, Tab, TabHeading, Text } from "native-base";

import styles from "./styles";

import TabDados from "./tabDados";
import TabItens from "./tabItens";
import TabSituacoes from "./tabSituacoes";

export interface Props {
	navigation: any;
	pedido: any;
	listaClientes: Array<any>;
	onSelecionarCliente: (itemValue: any, itemPosition: number) => void;
	onAlterarCampo: (campo: string, valor: any) => void; 
	onCriar: Function;
}
export interface State {}
class PedidoPage extends React.Component<Props, State> {
	render() {
		return (
			<Container style={styles.container}>
				<Header hasTabs>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name="ios-arrow-back" />
						</Button>
					</Left>

					<Body style={{ flex: 3 }}>
						<Title>Pedido</Title>
					</Body>

					<Right>
						<Button onPress={this.props.onCriar}><Text>Criar</Text></Button>
					</Right>
				</Header>

				
				<Tabs initialPage={0} >												
					<Tab heading={<div><TabHeading><Text>Dados</Text></TabHeading></div>}>
						<TabDados pedido={this.props.pedido} listaClientes={this.props.listaClientes} onSelecionarCliente={this.props.onSelecionarCliente} onAlterarCampo={this.props.onAlterarCampo}/>
					</Tab>
					<Tab heading={<TabHeading><Text>Ítens</Text></TabHeading>}>
						<TabItens itens={this.props.pedido.itens}/>
					</Tab>
					<Tab heading={<TabHeading><Text>Situação</Text></TabHeading>}>
						<TabSituacoes itens={this.props.pedido.situacoes} />
					</Tab>
				</Tabs>
				
			</Container>
		);
	}
}

export default PedidoPage;