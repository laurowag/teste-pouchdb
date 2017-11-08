import * as React from "react";
import { List, Text, ListItem, Content } from "native-base";

export interface Props {
    pedidos: Array<any>;
    itemSelecionado: any;
    onSelecionarItem: (itemId: any) => void;
}
export interface State {}
class ListaItens extends React.Component<Props, State> {
    selecionado(id) {
        return (this.props.itemSelecionado && this.props.itemSelecionado._id === id);
    }
	render() {
		return (
            <Content>
                <Text>sel: {this.props.itemSelecionado ? this.props.itemSelecionado._id : ''}</Text>
                <List dataArray={this.props.pedidos}
                    renderRow={pedido => <ListItem key={pedido._id} onPress={() => this.props.onSelecionarItem(pedido._id)}><Text>{pedido._id} - {pedido.dataemi} - {pedido.obssit}</Text></ListItem>} />
            </Content>
		);
	}
}

export default ListaItens;