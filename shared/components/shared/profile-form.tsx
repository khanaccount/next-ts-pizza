"use client";

import React from "react";
import { updateUserInfo } from "@/app/actions";
import { Container } from "@/shared/components/shared/container";
import { FormInput } from "@/shared/components/shared/form";
import {
    TFormRegisterData,
    formRegisterSchema,
} from "@/shared/components/shared/modals/auth-modal/forms/schemas";
import { Title } from "@/shared/components/shared/title";
import { Button } from "@/shared/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface Props {
    data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
    const form = useForm({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            fullName: data.fullName,
            email: data.email,
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (data: TFormRegisterData) => {
        try {
            await updateUserInfo({
                email: data.email,
                fullName: data.fullName,
                password: data.password,
            });

            toast.error("Данные обновлены 📝", {
                icon: "✅",
            });
        } catch (error) {
            return toast.error("Ошибка при обновлении данных", {
                icon: "❌",
            });
            console.log(error);
        }
    };

    const onClickSignOut = () => {
        signOut({
            callbackUrl: "/",
        });
    };

    return (
        <Container className="my-10">
            <Title text="Личные данные" size="md" className="font-bold" />

            <FormProvider {...form}>
                <form
                    className="flex flex-col gap-5 w-96 mt-10"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormInput name="email" label="E-Mail" required />
                    <FormInput name="fullName" label="Полное имя" required />

                    <FormInput type="password" name="password" label="Новый пароль" required />
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        label="Повторите пароль"
                        required
                    />

                    <Button
                        disabled={form.formState.isSubmitting}
                        className="text-base mt-10"
                        type="submit"
                    >
                        Сохранить
                    </Button>

                    <Button
                        onClick={onClickSignOut}
                        variant="secondary"
                        disabled={form.formState.isSubmitting}
                        className="text-base"
                        type="button"
                    >
                        Выйти
                    </Button>
                </form>
            </FormProvider>
        </Container>
    );
};
