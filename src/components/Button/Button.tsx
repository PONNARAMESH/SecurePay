import React from "react";
import { StyleSheet, View, Button, TouchableHighlight, Text } from "react-native";
export type ButtonProps = {
    title: string;
    onPress: () => void;
    // style: Record<string, any> | {}
    color?: string;
};
export function CustomButton(props: ButtonProps): React.JSX.Element {
    const { title, onPress, color } = props;
    return (
        // <Button
        //     color={color ?? "blue"}
        //     title={title || "button-name"}
        //     onPress={onPress}
        // />
        <TouchableHighlight
            style={styles.submit}
            onPress={onPress}
            underlayColor='#fff'>
            <Text style={[styles.submitText]}>{title || "button-name"}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    button_hover: {
        color: 'red'
    },
    submit: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#68a0cf',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
    }
})