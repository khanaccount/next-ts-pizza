import { Container, PizzaImage, Title } from "@/shared/components/shared";
import { GroupVariants } from "@/shared/components/shared/group-variants";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
    const product = await prisma.product.findFirst({ where: { id: Number(id) } });

    if (!product) {
        return notFound();
    }

    return (
        <Container className="flex flex-col my-24">
            <div className="flex flex-1">
                <PizzaImage imageUrl={product.imageUrl} size={20} />

                <div className="w-[490px] bg-[#f8f8f8] p-7">
                    <Title text={product.name} size="md" className="mb-5" />

                    <p className="text-gray-400">Lorem ipsum dolor sit amet</p>
                    <GroupVariants
                        value="1"
                        items={[
                            {
                                name: "Маленькая",
                                value: "1",
                                disabled: false,
                            },
                            {
                                name: "Средняя",
                                value: "2",
                                disabled: false,
                            },
                            {
                                name: "Большая",
                                value: "3",
                                disabled: false,
                            },
                        ]}
                    />
                </div>
            </div>
        </Container>
    );
}
