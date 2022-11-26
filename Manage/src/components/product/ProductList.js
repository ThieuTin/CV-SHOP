import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { Typography, Tooltip, Alert } from "@mui/material";
import { AddCircle, Edit, Delete } from "@mui/icons-material";
import { useConfirm } from "material-ui-confirm";
// path
import { PATH_DASHBOARD } from "../../routes/path";
//apis
import productApi from "../../apis/productApi";
// utils
import { fDate } from "../../utils/formatDate";
import { distinguishImage } from '../../utils/formatImage';

const columns = [
  {
    field: "name",
    title: "Name",
    width: "12%",
  },
  {
    field: "images",
    title: "Image",
    width: "12%",
    render: (row) => (
      <Tooltip
        disableFocusListener
        placement="left"
        title={
          <img
            src={distinguishImage(row.images[0])}
            alt=""
          />
        }
      >
        <img
          src={distinguishImage(row.images[0])}
          alt=""
          style={{
            width: "80px",
            height: "80px",
          }}
        />
      </Tooltip>
    ),
  },
  {
    field: "price",
    title: "Price",
    width: "12%",
  },
  {
    field: "discount",
    title: "Discount (%)",
    width: "12%",
  },
  {
    field: "quantity",
    title: "Quantity",
    width: "12%",
  },
  {
    field: "VATFee",
    title: "VATFee",
    width: "12%",
  },
  {
    field: "createdAt",
    title: "Created At",
    width: "12%",
    render: (row) => (
      <Typography variant="body2">{fDate(row.createdAt)}</Typography>
    ),
  },
];

const options = {
  selection: true,
  addRowPosition: "first",
  actionsColumnIndex: -1,
  tableLayout: "fixed",
  exportMenu: [{
    label: 'Export PDF',
    exportFunc: (cols, datas) => ExportPdf(cols, datas, 'ProductPdf')
  }, {
    label: 'Export CSV',
    exportFunc: (cols, datas) => ExportCsv(cols, datas, 'ProductCsv')
  }]
};

const ProductList = () => {
  const navigate = useNavigate();
  const confirm = useConfirm();
  const [products, setProducts] = useState(null);
  useEffect(() => {
    const getProducts = async () => {
      const products = await productApi.findAll();
      setProducts(products);
    };
    getProducts();
  }, []);
  const handleDelete = async _productID => {
    try {
      await confirm({
        title: "Are you sure to Delete this Product?",
        content: (
          <Alert severity="error">This product will move to recycle bin</Alert>
        ),
        confirmationButtonProps: {
          color: "error",
        },
      });
      const res = await productApi.deleteProductById(_productID);
      const { productID } = res;
      const newProduct = products.filter(_product => _product._id !== productID);
      setProducts(newProduct);
    } catch (error) {

    }
  };
  const handleDeleteSelected = async _data => {
    try {
      await confirm({
        title: 'Are you sure to Delete selected Products?',
        content: <Alert severity='error'>Selected products will move to recycle bin</Alert>,
        confirmationButtonProps: {
          color: 'error'
        }
      });
      const deleteIds = _data.map(item => item._id);
      const res = await productApi.deletedProductAll(deleteIds);
      const { productIDs } = res;
      const newProduct = products.filter(_product => !productIDs.includes(_product._id));
      setProducts(newProduct);
    } catch (error) {

    }
  }
  return (
    <>
      {products && (
        <MaterialTable
          title="Product"
          columns={columns}
          data={products}
          options={options}
          actions={[
            {
              icon: () => <Edit color="warning" />,
              tooltip: "View and Edit",
              onClick: (event, row) => navigate(`/product/edit/${row.slug}`),
              position: "row",
            },
            {
              icon: () => <Delete color="error" />,
              tooltip: "Delete",
              onClick: (event, row) => handleDelete(row._id),
              position: "row",
            },
            {
              icon: () => <AddCircle color="success" />,
              tooltip: "Add",
              isFreeAction: true,
              onClick: () => navigate(PATH_DASHBOARD.product.create),
            },
            {
              icon: () => <Delete color="error" />,
              tooltip: "Delete selected",
              onClick: (evt, data) => handleDeleteSelected(data),
            },
          ]}
        />
      )}
      {!products && "Loading...."}
    </>
  );
};

export default ProductList;
