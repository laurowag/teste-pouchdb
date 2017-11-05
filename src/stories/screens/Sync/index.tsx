import * as React from "react";
import { Container, Header, Title, Content, Button, Icon, Text, Left, Right, Body } from "native-base";

import styles from "./styles";
export interface Props {
	navigation: any;
	onClickLimparBanco: Function;
	onClickSincronizar: Function;
	formSync: Object;
	processando: boolean;
}
export interface State {}
class SyncPage extends React.Component<Props, State> {
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
						<Title>Sincronização</Title>
					</Body>

					<Right />
				</Header>
				<Content padder>
					{(this.props.processando ? <Text>Sincronizando</Text> : null)}
					<Button onPress={() => this.props.onClickLimparBanco()}><Text>Limpar banco</Text></Button>
					{this.props.formSync}
					<Button onPress={() => this.props.onClickSincronizar()}><Text>Sincronizar</Text></Button>
				</Content>
			</Container>
		);
	}
}

export default SyncPage;
