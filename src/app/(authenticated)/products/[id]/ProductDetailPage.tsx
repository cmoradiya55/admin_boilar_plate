"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/src/Components/ui/button";
import { Card, CardContent } from "@/src/Components/ui/card";
import { Badge } from "@/src/Components/ui/badge";
import {
  TextInput,
  SelectInput,
  TextArea,
} from "@/src/Components/FormComponents";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/Components/ui/alert-dialog";
import { PageHeader } from "@/src/Components/common";
import {
  ArrowLeft,
  Edit2,
  Trash2,
  Save,
  X,
  Package,
  DollarSign,
  Calendar,
  Tag,
} from "lucide-react";

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

interface ProductDetailPageProps {
  product: Product;
  onNavigate: (page: string) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: number) => void;
}

export default function ProductDetailPage({
  product,
  onNavigate,
  onUpdateProduct,
  onDeleteProduct,
}: ProductDetailPageProps) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: product,
  });

  const breadcrumbs = [
    { label: "Dashboard", href: "#" },
    { label: "Products", href: "#", onClick: () => onNavigate("products") },
    { label: product.name, href: "#", current: true },
  ];

  const getStatusBadge = (status: string, stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    }
    if (status === "active") {
      return (
        <Badge variant="default" className="bg-success/10 text-success">
          Active
        </Badge>
      );
    }
    return <Badge variant="secondary">Inactive</Badge>;
  };

  const handleSave = handleSubmit((data) => {
    onUpdateProduct(data);
    setIsEditing(false);
  });

  const handleCancel = () => {
    reset(product);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDeleteProduct(product.id);
    onNavigate("products");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={isEditing ? "Edit Product" : product.name}
        description={
          isEditing
            ? "Update product information"
            : "Product details and management"
        }
        breadcrumbs={breadcrumbs}
        actions={
          <div className="flex items-center gap-2">
            {!isEditing && (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the product "{product.name}" from your inventory.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        Delete Product
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
            {isEditing && (
              <>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-primary-gradient text-primary-foreground border-0 shadow-md hover:shadow-lg transition-all"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </>
            )}
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Image */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <div className="aspect-square w-full overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {isEditing ? (
                  <div className="space-y-6 flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <TextInput
                        name="name"
                        control={control}
                        label="Product Name"
                        placeholder="Enter product name"
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
                      placeholder="Enter product description"
                      required
                      error={errors.description}
                      rows={4}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                ) : (
                  <>
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-xl font-bold text-foreground">
                          {product.name}
                        </h1>
                        <p className="text-sm text-muted-foreground/60 mt-1">
                          {product.description}
                        </p>
                      </div>
                      {getStatusBadge(product.status, product.stock)}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        {
                          label: "Price",
                          value: `$${product.price.toLocaleString()}`,
                          icon: DollarSign,
                          colorClass: "text-success",
                          bgClass: "bg-success/10",
                          borderClass: "border-success/40",
                        },
                        {
                          label: "Stock",
                          value: `${product.stock} Units`,
                          icon: Package,
                          colorClass: "text-primary",
                          bgClass: "bg-primary/10",
                          borderClass: "border-primary/40",
                        },
                        {
                          label: "Category",
                          value: product.category,
                          icon: Tag,
                          colorClass: "text-foreground",
                          bgClass: "bg-secondary/20",
                          borderClass: "border-secondary/80",
                        },
                        {
                          label: "Created",
                          value: new Date(
                            product.createdAt,
                          ).toLocaleDateString(),
                          icon: Calendar,
                          colorClass: "text-warning",
                          bgClass: "bg-warning/10",
                          borderClass: "border-warning/40",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="p-2 rounded-xl border border-border bg-primary/[0.03] group hover:bg-primary/[0.06] transition-all duration-300"
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`p-1.5 rounded-xl ${item.bgClass} flex items-center justify-center border ${item.borderClass} group-hover:scale-110 transition-transform duration-300`}
                            >
                              <item.icon
                                className={`w-6 h-6 ${item.colorClass}`}
                              />
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mb-1">
                                {item.label}
                              </p>
                              <p className="text-[12px] font-bold text-foreground tracking-tight">
                                {item.value}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          {!isEditing && (
            <Card>
              <CardContent className="p-4">
                <h3 className="text-base font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Additional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-wider mb-1">
                      Total Value
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      ${(product.price * product.stock).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-wider mb-1">
                      Product ID
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      #{product.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-wider mb-1">
                      Availability
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      {product.stock > 0 ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-wider mb-1">
                      Last Updated
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
