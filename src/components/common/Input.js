import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ onChangeText }) => {
    return(
        <View>
            <Text>'Email'</Text>
            <TextInput 
                onChangeText={onChangeText}
                style={{ height: 20, width: 100 }}
            />
        </View>
    );
};

export { Input };