import React from "react";
import { StyleSheet, View, Button, TouchableHighlight, Text } from "react-native";
export type ButtonProps = {
    title: string;
    onPress: (data: any) => void;
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
            style={[styles.button, { backgroundColor: color}]}
            onPress={onPress}
            underlayColor='#fff'>
            <Text style={[styles.submitText]}>{title || "button-name"}</Text>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    button_hover: {
        color: 'red'
    },
    button: {
        fontWeight: "bold",
        fontSize: 20,
        paddingHorizontal: 20,
        paddingVertical: 7,
        // backgroundColor: '#68a0cf',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
    },
    submitText: {
        color: '#fff',
        textAlign: 'center',
        overflow: 'hidden',
    }
})