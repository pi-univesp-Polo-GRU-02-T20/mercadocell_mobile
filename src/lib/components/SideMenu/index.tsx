import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import React, {FC} from 'react' 
import { useAuth } from '../../../modules/user/contexts/AuthContext';
import { confirmLogout } from '../../helpers/alert';

interface SideMenuProps {
  drawerProps: DrawerContentComponentProps;
}

const SideMenu: FC<SideMenuProps> = ({drawerProps}) => {
    const { logout } = useAuth()

    return (
        <DrawerContentScrollView>
            <DrawerItem
                label="Alterar senha"
                onPress={() => drawerProps.navigation.navigate('changePassword')}
            />

            <DrawerItem
                label="Sair"
                onPress={() => confirmLogout(logout)}
            />
        </DrawerContentScrollView>
    )
}

export default SideMenu