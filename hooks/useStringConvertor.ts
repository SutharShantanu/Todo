import { useState, useEffect } from "react";

type FormatType = "uppercase" | "lowercase" | "camelcase" | "capitalize";

function toCamelCase(str: string): string {
    return str
        .toLowerCase()
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
            if (+match === 0) return ""; // remove spaces
            return index === 0 ? match.toLowerCase() : match.toUpperCase();
        });
}

function capitalize(str: string): string {
    return str.replace(/\b\w/, (char) => char.toUpperCase());
}

export function useStringFormat(input: string, format: FormatType) {
    const [formatted, setFormatted] = useState(input);

    useEffect(() => {
        if (!input) {
            setFormatted("");
            return;
        }

        switch (format) {
            case "uppercase":
                setFormatted(input.toUpperCase());
                break;
            case "lowercase":
                setFormatted(input.toLowerCase());
                break;
            case "camelcase":
                setFormatted(toCamelCase(input));
                break;
            case "capitalize":
                setFormatted(capitalize(input));
                break;
            default:
                setFormatted(input);
        }
    }, [input, format]);

    return formatted;
}
