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
};

export function Input(props: InputProps): React.JSX.Element {
    const { id, label, multiline, onChange, placeholder, keyboardType } = props;
    return (

        <View className={styles.customInputContainer} id={`${id}_view`}>
            <View className={styles.labelContainer}>
                <Text htmlFor={id} className={styles.label}>
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
                className={styles.textArea}
                placeholder={placeholder}
                keyboardType={keyboardType ?? "text"}

            // {...register(`${name}`, validation)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    customInputContainer: {
        flex: 1,
        gap: 0.5,
        marginTop: 20,

        // just for testing
        borderWidth: 2,
        borderColor: 'red',
    },
    labelContainer: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 0.3,
        marginBottom: 0.3,

        // just for testing
        borderWidth: 2,
        borderColor: 'red',
    },
    label: {
        textTransform: 'capitalize',
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
        // resize: 'vertical',
        maxHeight: 20,
        padding: 1.25,
        borderRadius: 5,
        borderWidth: 1,
        // width: 100%,
    },
    input: {
        padding: 1.25,
        borderRadius: 5,
        borderWidth: 1,
        // width: 100%,
    },
});