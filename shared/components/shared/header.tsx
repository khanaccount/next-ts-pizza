"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { Container, ProfileButton, SearchInput } from "./index";
import Link from "next/link";
import { CartButton } from "./index";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { AuthModal } from "./modals/auth-modal/auth-modal";

interface Props {
    className?: string;
    hasSearch?: boolean;
    hasCart?: boolean;
}

export const Header: React.FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
    const router = useRouter();
    const [openAuthModal, setOpenAuthModal] = React.useState(false);

    const searchParams = useSearchParams();

    React.useEffect(() => {
        let toastMessage = "";

        if (searchParams.has("paid")) {
            toastMessage = "Заказ успешно оплачен! Информация отправлена на почту.";
        }

        if (searchParams.has("verified")) {
            toastMessage = "Почта успешно подтверждена!";
        }

        if (toastMessage) {
            setTimeout(() => {
                router.replace("/");
                toast.success(toastMessage, {
                    duration: 3000,
                });
            }, 1000);
        }
    }, []);

    return (
        <header className={cn(" border-b", className)}>
            <Container className="flex item justify-between py-8">
                <Link href={"/"}>
                    <div className="flex items-center gap-4">
                        <Image src="/logo.png" alt="Logo" width={35} height={35} />
                        <div>
                            <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
                            <p className="text-sm text-gray-400 leading-3">вкуснее уже некуда</p>
                        </div>
                    </div>
                </Link>

                {hasSearch && (
                    <div className="mx-10 flex-1">
                        <SearchInput />
                    </div>
                )}

                <div className="flex items-center gap-3">
                    <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />

                    <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

                    {hasCart && (
                        <div>
                            <CartButton />
                        </div>
                    )}
                </div>
            </Container>
        </header>
    );
};
