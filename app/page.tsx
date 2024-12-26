import { Container, Title, TopBar, Filters, ProductCard, ProductGroupList } from "@/components/shared";

export default function Home() {
    return (
        <>
            <Container className="mt-10">
                <Title text="Все пиццы" size="lg" className="font-extrabold" />
            </Container>
            <TopBar />

            <Container className="mt-10 pb-14">
                <div className="flex gap-[80px]">
                    <div className="w-[250px]">
                        <Filters />
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-col gap-16">
                            <ProductGroupList
                                title={"Пиццы"}
                                items={[
                                    {
                                        id: 1,
                                        name: "Пицца 1",
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ef9050501f3fa690a64053f5f07626.avif",
                                        price: 100,
                                        items: [{ price: 100 }],
                                    },
                                    {
                                        id: 2,
                                        name: "Пицца 1",
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ef9050501f3fa690a64053f5f07626.avif",
                                        price: 100,
                                        items: [{ price: 100 }],
                                    },
                                    {
                                        id: 3,
                                        name: "Пицца 1",
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ef9050501f3fa690a64053f5f07626.avif",
                                        price: 100,
                                        items: [{ price: 100 }],
                                    },
                                    {
                                        id: 4,
                                        name: "Пицца 1",
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ef9050501f3fa690a64053f5f07626.avif",
                                        price: 100,
                                        items: [{ price: 100 }],
                                    },
                                    {
                                        id: 5,
                                        name: "Пицца 1",
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ef9050501f3fa690a64053f5f07626.avif",
                                        price: 100,
                                        items: [{ price: 100 }],
                                    },
                                    {
                                        id: 6,
                                        name: "Пицца 1",
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ef9050501f3fa690a64053f5f07626.avif",
                                        price: 100,
                                        items: [{ price: 100 }],
                                    },
                                    {
                                        id: 7,
                                        name: "Пицца 1",
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ef9050501f3fa690a64053f5f07626.avif",
                                        price: 100,
                                        items: [{ price: 100 }],
                                    },
                                    {
                                        id: 8,
                                        name: "Пицца 1",
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ef9050501f3fa690a64053f5f07626.avif",
                                        price: 100,
                                        items: [{ price: 100 }],
                                    },
                                ]}
                                categoryId={1}
                            />
                            <ProductGroupList
                                title={"Комбо"}
                                items={[
                                    {
                                        id: 1,
                                        name: "Пицца 1",
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ef9050501f3fa690a64053f5f07626.avif",
                                        price: 100,
                                        items: [{ price: 100 }],
                                    },
                                    {
                                        id: 2,
                                        name: "Пицца 1",
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ef9050501f3fa690a64053f5f07626.avif",
                                        price: 100,
                                        items: [{ price: 100 }],
                                    },
                                    {
                                        id: 3,
                                        name: "Пицца 1",
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ef9050501f3fa690a64053f5f07626.avif",
                                        price: 100,
                                        items: [{ price: 100 }],
                                    },
                                    {
                                        id: 4,
                                        name: "Пицца 1",
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ef9050501f3fa690a64053f5f07626.avif",
                                        price: 100,
                                        items: [{ price: 100 }],
                                    },
                                    {
                                        id: 5,
                                        name: "Пицца 1",
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ef9050501f3fa690a64053f5f07626.avif",
                                        price: 100,
                                        items: [{ price: 100 }],
                                    },
                                    {
                                        id: 6,
                                        name: "Пицца 1",
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ef9050501f3fa690a64053f5f07626.avif",
                                        price: 100,
                                        items: [{ price: 100 }],
                                    },
                                    {
                                        id: 7,
                                        name: "Пицца 1",
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ef9050501f3fa690a64053f5f07626.avif",
                                        price: 100,
                                        items: [{ price: 100 }],
                                    },
                                    {
                                        id: 8,
                                        name: "Пицца 1",
                                        imageUrl:
                                            "https://media.dodostatic.net/image/r:292x292/11ef9050501f3fa690a64053f5f07626.avif",
                                        price: 100,
                                        items: [{ price: 100 }],
                                    },
                                ]}
                                categoryId={2}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}
