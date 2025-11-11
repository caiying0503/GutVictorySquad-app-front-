import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gut Hero Squad</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Test')}
            >
                <Text style={styles.buttonText}>Start testing</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff3cc',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#B6DBE5',  
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,            
  },
  buttonText: {
    color: '#4A4243',               
    fontSize: 18,
    fontWeight: 'bold',
  },
});