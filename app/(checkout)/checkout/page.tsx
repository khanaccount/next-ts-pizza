"use client";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    CheckoutAddressForm,
    CheckoutCart,
    CheckoutPersonalForm,
    CheckoutSidebar,
    Container,
    Title,
} from "@/shared/components/shared";
import { useCart } from "@/shared/hooks";
import {
    checkoutFormSchema,
    CheckoutFormValues,
} from "@/shared/components/shared/checkout/checkout-form-schema";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";

export default function CheckoutPage() {
    const [submitting, setSubmiting] = React.useState(false);
    const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart();

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            comment: "",
        },
    });

    const onClickCountButton = (id: number, type: "plus" | "minus", quantity: number) => {
        const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    const onSubmit = async (data: CheckoutFormValues) => {
        try {
            setSubmiting(true);
            const url = await createOrder(data);

            toast.error("Заказ успешно оформлен! 📝", {
                icon: "✅",
            });

            if (url) {
                location.href = url;
            }
        } catch (err) {
            console.log(err);
            setSubmiting(false);
            return toast.error("Не удалось создать заказ", {
                icon: "❌",
            });
        }
    };

    return (
        <Container className="mt-5">
            <Title text="Оформление заказа" size="xl" className="font-extrabold mb-8" />
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10">
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <CheckoutCart
                                onClickCountButton={onClickCountButton}
                                removeCartItem={removeCartItem}
                                items={items}
                                loading={loading}
                            />

                            <CheckoutPersonalForm
                                className={loading ? "opacity-40 pointer-events-none" : ""}
                            />

                            <CheckoutAddressForm
                                className={loading ? "opacity-40 pointer-events-none" : ""}
                            />
                        </div>
                        <div className="w-[450px]">
                            <CheckoutSidebar
                                totalAmount={totalAmount}
                                loading={loading || submitting}
                            />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    );
}
