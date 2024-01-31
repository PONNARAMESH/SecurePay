import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

import { findInputError, isFormInvalid } from '../../utils';
import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../../assets/colors";
import { Icon } from "@rneui/themed";

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
    const [showPassword, setShowPassword] = useState<boolean>(true);
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
            <View style={[styles.inputContainer]}> 
                <TextInput
                    id={id}
                    style={[styles.input, {width: secureTextEntry ? "80%" : "100%",}]}
                    placeholder={placeholder}
                    // placeholderTextColor={colors.appThemeColor}
                    inputMode={inputMode || "none"}
                    secureTextEntry={secureTextEntry ? showPassword : false}
                    onChangeText={onChangeText}
                    value={value}
                />
                {
                    secureTextEntry && 
                    <Icon
                        name={ showPassword ? "eye-off" : "eye"}
                        onPress={() => { setShowPassword(!showPassword)}}
                        type="material-community"
                        size={24}
                        color={colors.gray}
                        containerStyle={{marginLeft: "auto", }}
                    />
                }
            </View> 
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
        fontSize: 15,
        color: colors.black,
    },
    inputContainer: { 
        borderWidth: 1,
        borderColor: colors.appThemeColor,
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: colors.white,
        borderRadius: 8, 
        paddingHorizontal: 10, 
    }, 
    icon: { 
        marginLeft: "auto", 
    }, 
    heading: { 
        alignItems: 'center', 
        fontSize: 20, 
        color: 'green', 
        marginBottom: 20, 
    }, 
});