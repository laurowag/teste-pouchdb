import * as React from "react";
import { Container, Header, Title, Button, Icon, Left, Right, Body, Tabs, Tab, TabHeading, Text } from "native-base";

import styles from "./styles";

import ListaItens from "./listaItens";

export interface Props {
	navigation: any;
	listaPendentes: Array<any>;
	listaEmAnalise: Array<any>;
	listaConcluidos: Array<any>;
	itemSelecionado: any;
	onSelecionarItem: (itemId: any) => void;
	onCriar: () => void;
	onEnviar: () => void;
}
export interface State {}
class ListaPedidosPage extends React.Component<Props, State> {
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
						<Button onPress={this.props.onEnviar}><Text>Enviar</Text></Button>
					</Right>
				</Header>

				
				<Tabs initialPage={0} >												
					<Tab heading={<div><TabHeading><Text>Pendentes</Text></TabHeading></div>}>
						<ListaItens pedidos={this.props.listaPendentes} onSelecionarItem={this.props.onSelecionarItem} itemSelecionado={this.props.itemSelecionado}/>
					</Tab>
					<Tab heading={<TabHeading><Text>A Enviar</Text></TabHeading>}>
						<ListaItens pedidos={this.props.listaEmAnalise} onSelecionarItem={this.props.onSelecionarItem} itemSelecionado={this.props.itemSelecionado}/>
					</Tab>
					<Tab heading={<TabHeading><Text>Concluídos</Text></TabHeading>}>
						<ListaItens pedidos={this.props.listaConcluidos} onSelecionarItem={this.props.onSelecionarItem} itemSelecionado={this.props.itemSelecionado}/>
					</Tab>
				</Tabs>
				
			</Container>
		);
	}
}

export default ListaPedidosPage;