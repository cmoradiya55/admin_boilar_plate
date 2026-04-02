"use client";

import { useRouter } from "next/navigation";
import AddProductPage from "./AddProductPage";
import { useToast } from "@/src/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  status: string;
  image: string;
  createdAt: string;
}

export default function AddProductPageRoute() {
  const router = useRouter();
  const { toast } = useToast();

  const handleNavigate = (page: string) => {
    if (page === "products") {
      router.push("/products");
    }
  };

  const handleAddProduct = (
    newProductData: Omit<Product, "id" | "createdAt">,
  ) => {
    // In a real app, you would make an API call to add the product
    console.log("Adding product:", newProductData);

    toast({
      title: "Product Added",
      description: `"${newProductData.name}" has been added to your inventory.`,
    });

    // Navigate back to products
    router.push("/products");
  };

  return (
    <AddProductPage
      onNavigate={handleNavigate}
      onAddProduct={handleAddProduct}
    />
  );
}
