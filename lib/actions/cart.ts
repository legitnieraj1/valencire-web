"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getCart() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: cart } = await supabase
        .from("carts")
        .select(`
            id,
            cart_items (
                id,
                product_id,
                quantity,
                products (
                    name,
                    price,
                    slug,
                    image_url
                )
            )
        `)
        .eq("user_id", user.id)
        .single();

    return cart;
}

export async function addToCart(productId: string, quantity: number = 1) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: "Not authenticated" };

    // 1. Get or Create Cart
    let { data: cart } = await supabase
        .from("carts")
        .select("id")
        .eq("user_id", user.id)
        .single();

    if (!cart) {
        const { data: newCart, error } = await supabase
            .from("carts")
            .insert({ user_id: user.id })
            .select("id")
            .single();

        if (error) return { error: error.message };
        cart = newCart;
    }

    // 2. Add Item
    // Check if item exists
    const { data: existingItem } = await supabase
        .from("cart_items")
        .select("id, quantity")
        .eq("cart_id", cart.id)
        .eq("product_id", productId)
        .single();

    if (existingItem) {
        await supabase
            .from("cart_items")
            .update({ quantity: existingItem.quantity + quantity })
            .eq("id", existingItem.id);
    } else {
        await supabase
            .from("cart_items")
            .insert({
                cart_id: cart.id,
                product_id: productId,
                quantity: quantity
            });
    }

    revalidatePath("/cart");
    return { success: true };
}

export async function removeFromCart(itemId: string) {
    const supabase = await createClient();

    // RLS ensures user owns the cart item via cart ownership
    const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", itemId);

    if (error) return { error: error.message };

    revalidatePath("/cart");
    return { success: true };
}
