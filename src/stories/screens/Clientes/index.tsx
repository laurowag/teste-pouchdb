import * as React from "react";
import { Container, Header, Title, Content, Card, CardItem, Button, Icon, Left, Right, Body, Text, Input } from "native-base";
import _ from 'lodash';


import styles from "./styles";
export interface Props {
	navigation: any;
	dados: Array<any>;
	pesquisar: Function;
}
export interface State {}
class ClientesPage extends React.Component<Props, State> {
	render() {
		return (
			<Container style={styles.container}>
				<Header>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name="ios-arrow-back" />
						</Button>
					</Left>

					<Body style={{ flex: 3 }}>
						<Title>Clientes</Title>
					</Body>

					<Right>
						<Input placeholder="Pesquisar" onChangeText={_.debounce((text) => this.props.pesquisar(text), 500)} />
					</Right>
				</Header>

				<Content>					
					<Card>
						{this.props.dados.map((cliente, i) => {
							return <CardItem key={i} cardBody={true}><Text>{cliente.nome}</Text></CardItem>
						})}
					</Card>

				</Content>
			</Container>
		);
	}
}

export default ClientesPage;
