import { ProductItem } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../constants/pizza";
import { Variant } from "../components/shared/group-variants";

export const getAvaliablePizzaSizes = (items: ProductItem[], type: PizzaType): Variant[] => {
    const filteredPizzasByType = items.filter((item) => item.pizzaType === type);
    const availablePizzasSizes = pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzasByType.some((pizza) => Number(pizza.size) === Number(item.value)),
    }));

    return availablePizzasSizes;
};
