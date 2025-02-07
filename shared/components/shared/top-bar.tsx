"use client";

import React from "react";
import { Container } from "./container";
import { Categories } from "./categories";

import { Category } from "@prisma/client";
import { CartButton } from "./cart-button";
import { cn } from "@/shared/lib/utils";

interface Props {
    categories: Category[];
    className?: string;
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
    const [cartVisible, setCartVisible] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setCartVisible(true);
            } else {
                setCartVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={cn("sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10", className)}>
            <Container className="flex items-center justify-between ">
                <Categories items={categories} />
                <div className="flex items-center">
                    {/* <SortPopup /> */}
                    <CartButton
                        className={cn(
                            "transition-all",
                            !cartVisible
                                ? "invisible w-0 p-0 opacity-0"
                                : "visible ml-5 opacity-100"
                        )}
                    />
                </div>
            </Container>
        </div>
    );
};
