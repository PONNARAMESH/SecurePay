import React from "react";
import { View, Text, StyleSheet } from "react-native";

export type DeviderProps = {
    label: string;
};

export const Separator = () => <View style={styles.separator} />

export function Devider(props: DeviderProps): React.JSX.Element {
    const {label} = props;
    return (
        <View style={styles.deviderContainer}>
            <Separator />
            <Text style={styles.content}>{label}</Text>
            <Separator />
        </View>
    )
}

const styles = StyleSheet.create({
    separator: {
        flex: 1,
        marginVertical: 20,
        borderWidth: 2,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    deviderContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    content: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        fontWeight: "bold"
    }
})