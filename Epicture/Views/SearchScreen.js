import React from 'react';
import { Button } from 'react-native';


export default function Search({navigation}) {
    return (
      <Button
        title="Search"
        onPress={() => console.log('ok')}
      />
    );
}