import * as React from "react";
import { List, ListItem, Text } from "native-base";

export interface Props {
    itens: Array<any>;
}
export interface State {}
class TabSituacoes extends React.Component<Props, State> {
	render() {
		return (
            <List>
                {this.props.itens.map(situacao => <ListItem><Text>{situacao.data}</Text><Text>{situacao.situacao}</Text></ListItem>)}
            </List>
		);
	}
}

export default TabSituacoes;