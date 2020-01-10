import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';  
import { DrawerActions } from 'react-navigation-drawer';


const CustomHeader = ({ navigation }) => (
    <View style={{height : 80}}>
        <TouchableOpacity>
        <Icon
        style={{padding : 15, marginTop : 20}}
        name='md-menu'
        size={32}
        color='green'
        onPress={() => navigation.openDrawer()}
        />
        </TouchableOpacity>
    </View>
);

export default CustomHeader;