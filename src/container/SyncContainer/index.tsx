import * as React from "react";

import Database from "../../boot/database";
import { Input, Form, Toast } from "native-base";

import Sync from "../../stories/screens/Sync";
export interface Props {
	navigation: any;
}
export interface State {
	servidor: string;
	bancoDeDados: string;
	usuario: string;
	senha: string;
	sincronizando: boolean;
	concluido: boolean;
	comErro: boolean;
	_rev?: any;
}
class SyncContainer extends React.Component<Props, State> {

	localDB = Database.getInstance();

	constructor() {
		super();
		this.state = {
			servidor: '',
			bancoDeDados: '',
			usuario: '',
			senha: '',
			sincronizando: false,
			concluido: false,
			comErro: false,			
		}
	}

	componentDidMount() {
		const x = this;
		Database.getPouchDBInstance().get('_local/confsync').then(doc => {
			x.setState({
				servidor: doc.servidor,
				bancoDeDados: doc.bancoDeDados,
				usuario: doc.usuario,
				senha: doc.senha,
				_rev: doc._rev,
			})
		});
	}

	onLimparBanco() {
		if (!this.state.sincronizando) {
			this.localDB.limparDatabase();
		}
	}

	onSincronizar() {
		if (!this.state.sincronizando) {
			Database.getPouchDBInstance().put({
				_id: '_local/confsync',
				servidor: this.state.servidor,
				bancoDeDados: this.state.bancoDeDados,
				usuario: this.state.usuario,
				senha: this.state.senha,
				_rev: this.state._rev,
			}).then(res => this.setState({_rev: res.rev}));
			this.setState({ sincronizando: true, concluido: false });
			this.localDB.replicar(
				this.state.bancoDeDados,
				this.state.servidor,
				this.state.usuario,
				this.state.senha,
				() => {
					Toast.show({
						text: "Sincronização concluída!",
						duration: 2000,
						position: "top",
						textStyle: { textAlign: "center" },
					});
					this.setState({ sincronizando: false, concluido: true, comErro: false });
				},
				(erro) => {
					Toast.show({
						text: `Erro: ${erro.message}`,
						duration: 2000,
						position: "top",
						textStyle: { textAlign: "center" },
					});
					this.setState({ sincronizando: false, concluido: true, comErro: true });
				}
			);
		}
	}

	alterarTexto(texto, campo) {
		let objeto = {};
		objeto[campo] = texto;
		this.setState(objeto);
	}

	render() {
		const form = (
			<Form>
				<Input
					placeholder="Servidor"
					secureTextEntry={false}
					onChangeText={text => this.alterarTexto.bind(this)(text, 'servidor')}
					value={this.state.servidor}
				/>
				<Input
					placeholder="Banco de dados"
					secureTextEntry={false}
					onChangeText={text => this.alterarTexto.bind(this)(text, 'bancoDeDados')}
					value={this.state.bancoDeDados}
				/>
				<Input
					placeholder="Usuário"
					secureTextEntry={false}
					onChangeText={text => this.alterarTexto.bind(this)(text, 'usuario')}
					value={this.state.usuario}
				/>
				<Input
					placeholder="Senha"
					secureTextEntry={true}
					onChangeText={text => this.alterarTexto.bind(this)(text, 'senha')}
					value={this.state.senha}
				/>
			</Form>
		);
		return <Sync
			navigation={this.props.navigation}
			formSync={form}
			onClickLimparBanco={this.onLimparBanco.bind(this)}
			onClickSincronizar={this.onSincronizar.bind(this)}
			processando={this.state.sincronizando}
		/>;
	}
}

export default SyncContainer;