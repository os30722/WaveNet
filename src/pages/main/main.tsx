import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { RootStackParamList } from '../../App';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './home';
import ProfilePage from './profile';
import SearchPage from './search';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeContext } from '../../common/contexts/themeContext';

export type BottomTabParamList = {
    Home: undefined,
    Search: undefined,
    Create: undefined,
    Profile: undefined,
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

type PageNavigationProp = NativeStackScreenProps <
    RootStackParamList,
    'Main'
>;

function MainPage({navigation}: PageNavigationProp): React.JSX.Element {
    const theme = useThemeContext();

    
    return (
        <Tab.Navigator screenOptions={{
            tabBarInactiveTintColor: 'white',
            tabBarActiveTintColor: theme.primary,
            headerShown: false
        }}>
            <Tab.Screen name ='Home' component={HomePage} 
                options={{
                    tabBarIcon: ({color,size}) => <Icon name='home-filled' color={color} size={size} />
                }}
                />
            <Tab.Screen name='Search' component={SearchPage} 
               options={{   
                    tabBarIcon: ({color,size}) => <Icon name='search' color={color} size={size} />
                }}
            />
            <Tab.Screen name='Create' component={HomePage} 
               options={{   
                    tabBarIcon: ({color,size}) => <Icon name='create' color={color} size={size} />
                }}
                listeners = {{
                    tabPress: (e) => {
                        e.preventDefault();
                        navigation.navigate('Selection')
                    }
                }}
            />
            <Tab.Screen name='Profile' component={ProfilePage} 
                options={{
                    tabBarIcon: ({color,size}) => <Icon name='person' color={color} size={size} />
                }}
            />
        </Tab.Navigator>
    );
}

export default MainPage;