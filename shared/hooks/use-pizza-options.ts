import React from "react";

import { PizzaSize, PizzaType } from "../constants/pizza";
import { useSet } from "react-use";
import { ProductItem } from "@prisma/client";
import { getAvaliablePizzaSizes } from "../lib";
import { Variant } from "../components/shared/group-variants";

interface ReturnProps {
    size: PizzaSize;
    type: PizzaType;
    selectedIngredients: Set<number>;
    availableSizes: Variant[];
    currentItemId?: number;
    setSize: (size: PizzaSize) => void;
    setType: (size: PizzaType) => void;
    addIngredient: (id: number) => void;
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
    const [size, setSize] = React.useState<PizzaSize>(20);
    const [type, setType] = React.useState<PizzaType>(1);
    const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

    const availableSizes = getAvaliablePizzaSizes(items, type);

    const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id;

    React.useEffect(() => {
        const isAvailableSize = availableSizes?.find(
            (item) => Number(item.value) === size && !item.disabled
        );
        const availableSize = availableSizes?.find((item) => !item.disabled);

        if (!isAvailableSize && availableSize) {
            setSize(Number(availableSize.value) as PizzaSize);
        }
    }, [type]);

    return {
        size,
        type,
        selectedIngredients,
        availableSizes,
        currentItemId,
        addIngredient,
        setSize,
        setType,
    };
};
