import React from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
    onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
    return (
        <AddressSuggestions
            token="7889a28df76a414d0bfc52b166e1e892df66671a"
            onChange={(data) => onChange?.(data?.value)}
        />
    );
};
