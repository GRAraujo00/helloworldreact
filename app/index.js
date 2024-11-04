import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

export const options = {
    title: 'Cadastro de Usuários',
};

export default function CadastroScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    const handleAddUser = () => {
        if (editingUser) {
            // Update existing user
            setUsers(users.map(user => user.id === editingUser.id ? {...user, name, email } : user));
            setEditingUser(null);
        } else {
            // Add new user
            setUsers([...users, { id: Date.now().toString(), name, email }]);
        }
        setName('');
        setEmail('');
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setName(user.name);
        setEmail(user.email);
    };

    const handleDeleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    return ( <
        View style = {
            { padding: 20 } } >
        <
        Text > Nome < /Text> <
        TextInput style = {
            { borderBottomWidth: 1, marginBottom: 10 } }
        value = { name }
        onChangeText = { setName }
        /> <
        Text > Email < /Text> <
        TextInput style = {
            { borderBottomWidth: 1, marginBottom: 10 } }
        value = { email }
        onChangeText = { setEmail }
        /> <
        Button title = { editingUser ? "Atualizar" : "Cadastrar" }
        onPress = { handleAddUser }
        />

        <
        FlatList data = { users }
        keyExtractor = {
            (item) => item.id }
        renderItem = {
            ({ item }) => ( <
                View style = {
                    { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 } } >
                <
                Text > { item.name } - { item.email } < /Text> <
                View style = {
                    { flexDirection: 'row' } } >
                <
                TouchableOpacity onPress = {
                    () => handleEditUser(item) } >
                <
                Text style = {
                    { color: 'blue', marginRight: 10 } } > Editar < /Text> <
                /TouchableOpacity> <
                TouchableOpacity onPress = {
                    () => handleDeleteUser(item.id) } >
                <
                Text style = {
                    { color: 'red' } } > Excluir < /Text> <
                /TouchableOpacity> <
                /View> <
                /View>
            )
        }
        /> <
        /View>
    );
}