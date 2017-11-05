import * as React from "react";
import { Container, InputGroup, Input, Text, Picker } from "native-base";

export interface Props {
    listaClientes: Array<any>;
    pedido: any;
    onSelecionarCliente: (itemValue: any, itemPosition: number) => void;
    onAlterarCampo: (campo: string, valor: any) => void; 
}
export interface State {}
class TabDados extends React.Component<Props, State> {
	render() {
        console.log(this.props.listaClientes.length);
		return (
            <Container>
                <InputGroup>
                    <Text>Cliente:</Text>
                    <Picker
                        iosHeader="Cliente"
                        mode="dropdown"
                        selectedValue={this.props.pedido.cliente}
                        onValueChange={this.props.onSelecionarCliente}>
                        {this.props.listaClientes.map(item => <Picker.Item key={item.id} label={item.nome} value={item.id} />)}
                   </Picker>
                </InputGroup>
                <InputGroup>
                    <Text>Data:</Text>
                    <Input onChangeText={text => this.props.onAlterarCampo('dataemi', text)}/>
                </InputGroup>
                <InputGroup>
                    <Text>Moeda:</Text>
                    <Input onChangeText={text => this.props.onAlterarCampo('idmoeda', text)}/>
                </InputGroup>
                <InputGroup>
                    <Text>Plano:</Text>
                    <Input onChangeText={text => this.props.onAlterarCampo('idpla', text)}/>
                </InputGroup>
                <InputGroup>
                    <Text>Tipo de proposta:</Text>
                    <Input onChangeText={text => this.props.onAlterarCampo('idttr', text)}/>
                </InputGroup>
            </Container>
		);
	}
}

export default TabDados;