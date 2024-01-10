import React from "react";
import { useFormContext } from "react-hook-form";

import { findInputError, isFormInvalid } from '../../utils';
import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../../assets/colors";
import { color } from "@rneui/base";

export type InputProps = {
    id: string;
    name: string;
    label: string;
    errors?: any;
    multiline?: boolean;
    onChange?: (data: any) => void;
    onChangeText?: (data: any) => void;
    placeholder: string;
    inputMode?: 'decimal'| 'email'| 'none' | 'numeric' | 'search' | 'tel' | 'text' | 'url';
    secureTextEntry?: boolean;
    value?: string;
};

export const Input = React.memo((props: InputProps): React.JSX.Element => {
    const {
        id,
        label,
        errors,
        multiline,
        onChange,
        onChangeText,
        placeholder,
        inputMode,
        secureTextEntry,
        value
    } = props;

    const inputError: any = findInputError(errors, id);
    const isInvalid = isFormInvalid(inputError);
    // console.log("##inputError: ", inputError);
    // console.log("##isInvalid: ", isInvalid);

    return (

        <View style={styles.customInputContainer} id={`${id}_view`}>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>
                    {label}
                </Text>
                {/* <AnimatePresence mode="wait" initial={false}> */}
                <View>
                    {isInvalid && (
                        <Text
                            style={styles.errorMessage}
                            key={inputError?.error?.message}
                        >
                            * {inputError?.error?.message}
                        </Text>
                    )}
                </View>
                {/* </AnimatePresence> */}
            </View>
            <TextInput
                id={id}
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={colors.appThemeColor}
                inputMode={inputMode || "none"}
                secureTextEntry={secureTextEntry ?? false}
                onChangeText={onChangeText}
                value={value}
            />
        </View>
    )
})

const styles = StyleSheet.create({
    customInputContainer: {
        flex: 1,
        gap: 0.5,
        marginVertical: 5,
    },
    labelContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 3,
    },
    label: {
        textTransform: 'capitalize',
        marginVertical: 3,
        fontSize: 15,
        // color: "#000",
        color: colors?.appThemeColor,
        fontWeight: "bold",
    },
    errorMessage: {
        flex: 1,
        paddingLeft: 0.5,
        paddingRight: 0.5,
        gap: 0.25,
        alignItems: 'center',
        borderRadius: 0.375,
        color: '#EF4444',
        // backgroundColor: '#FEE2E2',
        margin: 0,
        fontWeight: "700",
    },
    textArea: {
        maxHeight: 20,
        paddingHorizontal: 3,
        paddingVertical: 3,
        borderRadius: 5,
        borderWidth: 1,
    },
    input: {
        backgroundColor: colors.appThemeColorMedium,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.appThemeColor,
        fontSize: 15,
        color: colors.black
    },
});