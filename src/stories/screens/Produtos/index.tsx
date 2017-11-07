import * as React from "react";
import { Container, Header, Title, Content, Card, CardItem, Button, Icon, Left, Right, Body, Text, Input } from "native-base";
import _ from 'lodash';


import styles from "./styles";
export interface Props {
	navigation: any;
	dados: Array<any>;
	pesquisar: Function;
	carregando: boolean;
}
export interface State {}
class ProdutosPage extends React.Component<Props, State> {
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
						<Title>Produtos</Title>
					</Body>

					<Right>
						<Input placeholder="Pesquisar" onChangeText={_.debounce((text) => this.props.pesquisar(text), 500)} />
					</Right>
				</Header>

				<Content>
					{this.props.carregando ? (<Text>Carregando...</Text>) : null}
					<Card>
						{this.props.dados.map((produto, i) => {
							return <CardItem key={i} cardBody={true}><Text>{produto.desc} - {produto.precos}</Text></CardItem>
						})}
					</Card>

				</Content>
			</Container>
		);
	}
}

export default ProdutosPage;