import React from "react";
import { StyleSheet, View, Button } from "react-native";
export type ButtonProps = {
    title: string;
    onPress: () => void;
    style: Record<string, any> | {}
};
export function CustomButton(props: ButtonProps): React.JSX.Element {
    const { title, onPress, style } = props;
    return (
        <Button
            style={[styles.button, style]}
            title={title || "button-name"}
            onPress={onPress}
        />
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
    }
})