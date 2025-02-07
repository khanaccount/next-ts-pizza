import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const itemId = Number(id);

        const data = (await req.json()) as { quantity: number };
        const token = req.cookies.get("cartToken")?.value;

        if (!token) {
            return NextResponse.json({ message: "No token" });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: itemId,
            },
        });

        if (!cartItem) {
            return NextResponse.json({ error: "Cart item not found" });
        }

        await prisma.cartItem.update({
            where: {
                id: cartItem.id,
            },
            data: {
                quantity: data.quantity,
            },
        });

        const updatedUserCart = await updateCartTotalAmount(token);

        return NextResponse.json(updatedUserCart);
    } catch (error) {
        console.log("[CART_PATCH Server error]", error);
        return NextResponse.json({ message: "Server error]" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = await params;

        const itemId = Number(id);
        const token = req.cookies.get("cartToken")?.value;

        if (!token) {
            return NextResponse.json({ error: "Cart token not found" });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: itemId,
            },
        });

        if (!cartItem) {
            return NextResponse.json({ error: "Cart item not found" });
        }

        await prisma.cartItem.delete({
            where: {
                id: itemId,
            },
        });

        const updatedUserCart = await updateCartTotalAmount(token);

        return NextResponse.json(updatedUserCart);
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "[CART_DELETE] Server error" }, { status: 500 });
    }
}
