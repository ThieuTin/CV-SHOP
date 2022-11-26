import { Container } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
//apis
import productApi from "../../apis/productApi";
// components
import Page from "../../components/Page";
import HeaderBreadcrumbs from "../../components/HeaderBreadcrumbs";
import { ProductForm } from "../../components/product";
// path
import { PATH_DASHBOARD } from "../../routes/path";

const ProductCreate = () => {
  const [product, setProduct] = useState(null);
  const { pathname } = useLocation();
  const isEdit = pathname.includes("edit");
  useEffect(() => {
    const getProduct = async () => {
      const product = await productApi.findBySlug(pathname.split("/").pop());
      setProduct(product);
    };
    isEdit && getProduct();
  }, [isEdit, pathname]);

  return (
    <Page title={`${product?.name || "Create new Product"}`}>
      <Container sx={{ pb: 3 }}>
        <HeaderBreadcrumbs
          header={!isEdit ? "Create new Product" : product ? product.name : ""}
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Products", href: PATH_DASHBOARD.product.list },
          ]}
        />
        <ProductForm isEdit={isEdit} product={product} />
      </Container>
    </Page>
  );
};

export default ProductCreate;
