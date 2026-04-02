"use client";

import { useState } from "react";
import { Button } from "@/src/Components/ui/button";
import { Input } from "@/src/Components/ui/input";
import { Card, CardContent } from "@/src/Components/ui/card";
import { Badge } from "@/src/Components/ui/badge";
import { PageHeader } from "@/src/Components/common";
import { Plus, Search, Package, DollarSign, AlertCircle } from "lucide-react";

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

interface ProductManagementProps {
  onNavigate: (page: string, productId?: number) => void;
  products: Product[];
  onUpdateProducts?: (products: Product[]) => void;
}

export default function ProductManagement({
  onNavigate,
  products,
  onUpdateProducts,
}: ProductManagementProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalProducts = products.length;
  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0,
  );
  const outOfStockCount = products.filter(
    (product) => product.stock === 0,
  ).length;

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

  const handleProductClick = (productId: number) => {
    onNavigate("product-detail", productId);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Product Management"
        description="Manage your product inventory, pricing, and availability."
        actions={
          <Button
            onClick={() => onNavigate("add-product")}
            className="flex items-center gap-2 bg-primary-gradient text-primary-foreground border-0 shadow-md hover:shadow-lg transition-all"
          >
            <Plus className="w-4 h-4 text-primary-foreground" />
            Add Product
          </Button>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground/60">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {totalProducts}
                </p>
              </div>
              <Package className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground/60">
                  Total Value
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {totalValue.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground/60">
                  Out of Stock
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {outOfStockCount}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e: any) => setSearchTerm(e.target.value)}
                className="pl-10 bg-secondary/50 border-border focus:bg-background transition-colors"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105"
            onClick={() => handleProductClick(product.id)}
          >
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-base text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  {getStatusBadge(product.status, product.stock)}
                </div>

                <p className="text-sm text-muted-foreground/60 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-foreground">
                      ${product.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground/60">
                      Stock: {product.stock}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-border text-muted-foreground font-medium"
                  >
                    {product.category}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No products found
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm
                ? "Try adjusting your search terms."
                : "Get started by adding your first product."}
            </p>
            {!searchTerm && (
              <Button onClick={() => onNavigate("add-product")}>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
