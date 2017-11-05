import * as React from "react";
import { List, ListItem, Text } from "native-base";

export interface Props {
    itens: Array<any>;
}
export interface State {}
class TabItens extends React.Component<Props, State> {
	render() {
		return (
            <List>
                {this.props.itens.map(item => <ListItem><Text>{item.produto}</Text></ListItem>)}
            </List>
		);
	}
}

export default TabItens;