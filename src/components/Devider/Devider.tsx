import React from "react";
import { View, Text, StyleSheet } from "react-native";

export type DividerProps = {
    label: string;
    color: string;
};

export type Separator = {
    color: string;
};

export const Separator = (props: Separator) => {
    return (
        <View style={[styles.separator, { borderColor: props.color }]} />
    )
}

export const Divider = React.memo((props: DividerProps): React.JSX.Element => {
    let { label, color } = props;
    // color = color ?? 'lightgray';
    return (
        <View style={styles.dividerContainer}>
            <Separator color={color} />
            <Text style={[styles.content, { color }]}>{label}</Text>
            <Separator color={color} />
        </View>
    )
})

const styles = StyleSheet.create({
    separator: {
        flex: 1,
        marginVertical: 20,
        borderWidth: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    dividerContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    content: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        fontWeight: "bold"
    }
})