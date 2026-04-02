"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/src/Components/ui/button";
import { Card, CardContent } from "@/src/Components/ui/card";
import { Label } from "@/src/Components/ui/label";
import { Alert, AlertDescription } from "@/src/Components/ui/alert";
import {
  TextInput,
  TextArea,
  SelectInput,
} from "@/src/Components/FormComponents";
import { PageHeader } from "@/src/Components/common";
import { Save, Upload, CheckCircle, AlertCircle } from "lucide-react";

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

interface AddProductPageProps {
  onNavigate: (page: string) => void;
  onAddProduct: (product: Omit<Product, "id" | "createdAt">) => void;
}

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  status: string;
  image: string;
}

export default function AddProductPage({
  onNavigate,
  onAddProduct,
}: AddProductPageProps) {
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      stock: 0,
      status: "active",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    },
  });

  const productImage = watch("image");

  const breadcrumbs = [
    { label: "Dashboard", href: "#" },
    { label: "Products", href: "#", onClick: () => onNavigate("products") },
    { label: "Add Product", href: "#", current: true },
  ];

  const onSubmit = async (data: ProductFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onAddProduct(data);
      setShowSuccess(true);

      // Reset form
      reset();

      // Navigate back to products after a short delay
      setTimeout(() => {
        onNavigate("products");
      }, 1500);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleImageChange = () => {
    // For demo purposes, cycle through some sample images
    const sampleImages = [
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    ];
    const currentIndex = sampleImages.indexOf(productImage);
    const nextIndex = (currentIndex + 1) % sampleImages.length;
    setValue("image", sampleImages[nextIndex]);
  };

  if (showSuccess) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Product Added Successfully"
          description="Your new product has been added to the inventory."
          breadcrumbs={breadcrumbs}
        />

        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Product Added Successfully!
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Your new product has been successfully added to your inventory system and is now live.
            </p>
            <Button 
                onClick={() => onNavigate("products")} 
                className="bg-primary-gradient text-primary-foreground border-0 h-11 px-8 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Back to Products
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New Product"
        description="Create a new product in your inventory."
        breadcrumbs={breadcrumbs}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Image Preview */}
          <div className="lg:col-span-1">
            <Card className="border-border">
              <CardContent className="p-6">
                <Label className="text-xs font-bold text-secondary uppercase tracking-widest mb-4 block">
                  Product Image
                </Label>
                <div className="mt-2 space-y-4 text-primary">
                  <div className="aspect-square w-full overflow-hidden rounded-2xl border-2 border-dashed border-primary/20 bg-primary/[0.02]">
                    <img
                      src={productImage}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-11 border-primary/20 hover:border-primary hover:bg-primary/5 text-primary rounded-xl transition-all"
                    onClick={handleImageChange}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Change Image
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Details Form */}
          <div className="lg:col-span-2">
            <Card className="border-border">
              <CardContent className="p-6 space-y-8">
                <div>
                  <h3 className="text-base font-bold text-foreground mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Product Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <TextInput
                      name="name"
                      control={control}
                      label="Product Name"
                      placeholder="e.g. MacBook Pro M3"
                      required
                      error={errors.name}
                    />

                    <SelectInput
                      name="category"
                      control={control}
                      label="Category"
                      placeholder="Select category"
                      required
                      error={errors.category}
                      options={[
                        { value: "Electronics", label: "Electronics" },
                        { value: "Furniture", label: "Furniture" },
                        { value: "Clothing", label: "Clothing" },
                        { value: "Books", label: "Books" },
                        { value: "Sports", label: "Sports" },
                      ]}
                    />
                  </div>

                  <TextArea
                    name="description"
                    control={control}
                    label="Description"
                    placeholder="Provide a detailed description of the product..."
                    required
                    error={errors.description}
                    className="mt-6"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <TextInput
                      name="price"
                      control={control}
                      label="Price ($)"
                      type="number"
                      placeholder="0.00"
                      required
                      error={errors.price}
                    />

                    <TextInput
                      name="stock"
                      control={control}
                      label="Stock Quantity"
                      type="number"
                      placeholder="0"
                      required
                      error={errors.stock}
                    />

                    <SelectInput
                      name="status"
                      control={control}
                      label="Status"
                      error={errors.status}
                      options={[
                        { value: "active", label: "Active" },
                        { value: "inactive", label: "Inactive" },
                      ]}
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <div className="flex items-center justify-end gap-4">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => onNavigate("products")}
                      className="rounded-xl h-11 px-6 hover:bg-secondary transition-colors"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-primary-gradient text-primary-foreground border-0 h-11 px-8 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>Adding Product...</>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Add Product
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive" className="rounded-xl border-destructive/20 bg-destructive/5">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please fix the errors above before submitting the form.
            </AlertDescription>
          </Alert>
        )}
      </form>
    </div>
  );
}
