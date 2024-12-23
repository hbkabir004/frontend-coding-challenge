"use client";

import { BackToHome } from "@/components/backToHome/backToHome";
import { PRODUCTS_DATA } from "@/data/productsData";
import { usePagination } from "@/hooks/usePagination";
import { Product } from "@/types";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { ProductList } from "@/views/products/productList/productList";
import { ProductModal } from "@/views/products/productModal/productModal";
import React, { useCallback, useEffect, useState } from "react";

export const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });

  const handleOpenModal = useCallback((product: Product) => {
    setSelectedProduct(product);
    window.history.pushState({ product: product.id }, "", `/products?product=${product.id}`);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
    window.history.pushState({}, "", "/products");
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("product");
    if (productId) {
      const product = PRODUCTS_DATA.find(p => p.id === productId);
      if (product) {
        setSelectedProduct(product);
      }
    }

    const handlePopState = (event: PopStateEvent) => {
      const productId = new URLSearchParams(window.location.search).get("product");
      if (productId) {
        const product = PRODUCTS_DATA.find(p => p.id === productId);
        if (product) {
          setSelectedProduct(product);
        }
      } else {
        setSelectedProduct(null);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className="h-4" />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};
