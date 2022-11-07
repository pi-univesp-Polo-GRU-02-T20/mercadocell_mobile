import { Alert } from "react-native";

function confirmLogout(logout: () => Promise<void> ) {
    Alert.alert(
        "Deseja realmente sair?",
        "",
        [
          {
            text: "Cancelar",
            style: "cancel"
          },
          { text: "Sair", onPress: logout }
        ]
    );
}

export {
    confirmLogout
}