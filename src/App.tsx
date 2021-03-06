import React from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Root } from "native-base";
import { Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;

import Login from "./container/LoginContainer";
import Home from "./container/HomeContainer";
import BlankPage from "./container/BlankPageContainer";
import Sidebar from "./container/SidebarContainer";
import Clientes from "./container/ClientesContainer";
import Produtos from "./container/ProdutosContainer";
import Pedido from "./container/PedidoContainer";
import ListaPedidos from "./container/ListaPedidosContainer";
import Sync from "./container/SyncContainer";

const Drawer = DrawerNavigator(
	{
		Home: { screen: Home },
	},
	{
		drawerWidth: deviceWidth - 50,
		drawerPosition: "left",
		contentComponent: props => <Sidebar {...props} />,
	}
);

const App = StackNavigator(
	{
		Login: { screen: Login },
		BlankPage: { screen: BlankPage },
		Drawer: { screen: Drawer },
		Clientes: { screen: Clientes },
		Produtos: { screen: Produtos },
		Pedido: { screen: Pedido },
		Sync: { screen: Sync },
		ListaPedidos: {screen: ListaPedidos }
	},
	{
		initialRouteName: "Login",
		headerMode: "none",
	}
);

export default () => (
	<Root>
		<App />
	</Root>
);
