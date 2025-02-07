"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";

interface QueryFilters extends PropsRangeSlider {
    pizzaTypes: string;
    sizes: string;
    ingredients: string;
}

interface PropsRangeSlider {
    priceFrom?: number;
    priceTo?: number;
}

export interface Filters {
    sizes: Set<string>;
    pizzaTypes: Set<string>;
    selectedIngredients: Set<string>;
    prices: PropsRangeSlider;
}
interface ReturnProps extends Filters {
    setPrices: (name: keyof PropsRangeSlider, value: number) => void;
    setPizzaTypes: (value: string) => void;
    setSizes: (value: string) => void;
    setSelectedIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

    const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
        new Set<string>(searchParams.get("ingredients")?.split(","))
    );

    const [sizes, { toggle: toggleSizes }] = useSet(
        new Set<string>(searchParams.has("sizes") ? searchParams.get("sizes")?.split("") : [])
    );

    const [pizzaTypes, { toggle: tooglePizzaTypes }] = useSet(
        new Set<string>(
            searchParams.has("pizzaTypes") ? searchParams.get("pizzaTypes")?.split("") : []
        )
    );

    const [prices, setPrices] = React.useState<PropsRangeSlider>({
        priceFrom: Number(searchParams.get("priceFrom")) || undefined,
        priceTo: Number(searchParams.get("priceTo")) || undefined,
    });

    const setPriceRange = (name: keyof PropsRangeSlider, value: number) => {
        setPrices((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return React.useMemo(
        () => ({
            sizes,
            pizzaTypes,
            selectedIngredients,
            prices,
            setPrices: setPriceRange,
            setPizzaTypes: tooglePizzaTypes,
            setSizes: toggleSizes,
            setSelectedIngredients: toggleIngredients,
        }),
        [sizes, pizzaTypes, selectedIngredients, prices]
    );
};
