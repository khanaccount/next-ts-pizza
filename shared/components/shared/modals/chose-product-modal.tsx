"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/shared/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { ProductWithRelations } from "@/@types/prisma";
import { ProductForm } from "../product-form";
import { useRouter } from "next/navigation";

interface Props {
    product: ProductWithRelations;
    className?: string;
}

export const ChooseProductModal = ({ product, className }: Props) => {
    const router = useRouter();

    const onCloseModal = () => {
        router.back();
    };
    return (
        <Dialog open={Boolean(product)} onOpenChange={onCloseModal}>
            <DialogContent
                aria-describedby={undefined}
                className={cn(
                    "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
                    className
                )}
            >
                <VisuallyHidden>
                    <DialogTitle>Выберите продукт</DialogTitle>
                </VisuallyHidden>
                <ProductForm product={product} onSubmit={() => router.back()} />
            </DialogContent>
        </Dialog>
    );
};
