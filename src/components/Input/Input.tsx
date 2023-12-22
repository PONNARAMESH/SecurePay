import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export type InputProps = {
    id: string;
    name: string;
    label: string;
    multiline?: boolean;
    onChange?: () => void;
    placeholder: string;
    keyboardType?: "ascii-capable" | "ascii-capable-number-pad" | "decimal-pad" | "default" | "email-address" | "name-phone-pad" | "number-pad" | "numbers-and-punctuation" | "numeric" | "phone-pad" | "twitter" | "url" | "visible-password" | "web-search";
    secureTextEntry?: boolean;
};

export function Input(props: InputProps): React.JSX.Element {
    const { id, label, multiline, onChange, placeholder, keyboardType, secureTextEntry } = props;
    return (

        <View style={styles.customInputContainer} id={`${id}_view`}>
            <View style={styles.labelContainer}>
                <Text style={styles.label}>
                    {label}
                </Text>
                {/* <AnimatePresence mode="wait" initial={false}>
                    {isInvalid && (
                        <InputError
                            message={inputError.error.message}
                            key={inputError.error.message}
                        />
                    )}
                </AnimatePresence> */}
            </View>
            <TextInput
                id={id}
                style={styles.input}
                placeholder={placeholder}
                // keyboardType={keyboardType ?? "ascii-capable"}
                secureTextEntry={secureTextEntry ?? false}

            // {...register(`${name}`, validation)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    customInputContainer: {
        flex: 1,
        gap: 0.5,
        marginVertical: 5,
    },
    labelContainer: {
        flex: 1,
        justifyContent: 'space-between',
        marginVertical: 3,
    },
    label: {
        textTransform: 'capitalize',
        marginVertical: 3,
        fontSize: 15,
        color: "#000",
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
        backgroundColor: '#FEE2E2',
        margin: 0
    },
    textArea: {
        maxHeight: 20,
        paddingHorizontal: 3,
        paddingVertical: 3,
        borderRadius: 5,
        borderWidth: 1,
    },
    input: {
        backgroundColor: "#F4F6F6",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 15,
    },
});