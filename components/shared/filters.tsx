"use client";

import React from "react";
import { Title } from "./title";
import { Input } from "../ui";
import { RangeSlider, CheckboxFiltersGroup } from "./index";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { useSet } from "react-use";

interface Props {
    className?: string;
}

interface PropsRangeSlider {
    priceFrom: number;
    priceTo: number;
}

export const Filters: React.FC<Props> = ({ className }) => {
    const { ingredients, loading, onAddId, selectedIngredients } = useFilterIngredients();

    const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));
    const [pizzaTypes, { toggle: tooglePizzaTypes }] = useSet(new Set<string>([]));

    const [prices, setPrice] = React.useState<PropsRangeSlider>({ priceFrom: 0, priceTo: 1000 });

    const setPriceRange = (name: keyof PropsRangeSlider, value: number) => {
        setPrice({
            ...prices,
            [name]: value,
        });
    };

    const items = ingredients.map((item) => ({ value: String(item.id), text: item.name }));

    React.useEffect(() => {
        console.log({ prices, ingredients, selectedIngredients, pizzaTypes });
        console.log(prices, ingredients, selectedIngredients, pizzaTypes);
    }, [prices, ingredients, selectedIngredients, pizzaTypes, sizes]);

    return (
        <div className={className}>
            <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

            <div className="flex flex-col gap-4">
                <CheckboxFiltersGroup
                    title="Тип теста"
                    name="pizzaTypes"
                    className="mb-5"
                    onClickCheckbox={tooglePizzaTypes}
                    selected={pizzaTypes}
                    items={[
                        { text: "Тонкое", value: "1" },
                        { text: "Традиционное", value: "2" },
                    ]}
                />
            </div>

            <CheckboxFiltersGroup
                title="Размеры"
                name="sizes"
                className="mb-5"
                selected={sizes}
                onClickCheckbox={toggleSizes}
                items={[
                    { text: "20 см", value: "20" },
                    { text: "30 см", value: "30" },
                    { text: "40 см", value: "40" },
                ]}
            />

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Цена от и до:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={1000}
                        value={String(prices.priceFrom)}
                        onChange={(e) => setPriceRange("priceFrom", Number(e.target.value))}
                    />
                    <Input
                        type="number"
                        placeholder="1000"
                        min={100}
                        max={1000}
                        value={String(prices.priceTo)}
                        onChange={(e) => setPriceRange("priceTo", Number(e.target.value))}
                    />
                </div>

                <RangeSlider
                    min={0}
                    max={1000}
                    step={10}
                    value={[prices.priceFrom, prices.priceTo]}
                    onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })}
                />

                <CheckboxFiltersGroup
                    title="Ингредиенты"
                    name="ingredients"
                    className="mt-5"
                    limit={4}
                    defaultItems={items.slice(0, 6)}
                    items={items}
                    loading={loading}
                    onClickCheckbox={onAddId}
                    selected={selectedIngredients}
                />
            </div>
        </div>
    );
};
