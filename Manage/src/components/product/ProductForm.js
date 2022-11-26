import PropTypes from "prop-types";
import { useRef } from "react";
import {
  Grid,
  Stack,
  Card,
  Typography,
  TextField,
  FormHelperText,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { FormikProvider, Form, useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useConfirm } from "material-ui-confirm";
// apis
import productApi from "../../apis/productApi";
// upload
import UploadMultipleFile from "../upload/UploadMultipleFile";
// editor
import QuillEditor from "../editor/quill";
//ultils
import { createProductSchema } from "../../utils/yupSchemas";
// path
import { PATH_DASHBOARD } from "../../routes/path";
const propTypes = {
  isEdit: PropTypes.bool,
  product: PropTypes.object,
};

const ProductForm = ({ isEdit, product }) => {
  const confirm = useConfirm();
  const navigate = useNavigate();
  const descriptionRef = useRef(null);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: product?.name || "",
      categoryId: product?.categoryId || [],
      images: product?.images || [],
      information: product?.information || [],
      description: product?.description || "",
      price: product?.price || "",
      discount: product?.discount || "",
      quantity: product?.quantity || "",
      warranty: product?.warranty || [],
      tags: product?.tags || [],
      VATFee: product?.VATFee || "",
      limit: product?.limit || "",
    },
    validationSchema: createProductSchema,
    onSubmit: async (values, { resetForm }) => {
      const {
        name,
        categoryId,
        images,
        information,
        description,
        price,
        discount,
        quantity,
        warranty,
        tags,
        VATFee,
        limit,
      } = values;
      var formData = new FormData();
      formData.append("name", name);
      formData.append("categoryId", categoryId);
      images.forEach((image) => {
        formData.append("images", image);
      });
      formData.append("information", information);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("quantity", quantity);
      formData.append("warranty", warranty);
      formData.append("tags", tags);
      formData.append("VATFee", VATFee);
      formData.append("limit", limit);
      let res = null;
      if (isEdit) {
        res = await productApi.editProductById(product._id, formData);
        navigate(PATH_DASHBOARD.product.list);
      } else {
        res = await productApi.insertProduct(formData);
        resetForm();
      }
      let { statusText, message } = res;
            // product in recycle bin
            if(statusText === 'info'){
                try {
                    await confirm({
                        title: message,
                        content: <Alert severity={statusText}>Do you want to restore this Product ?</Alert>
                    });
                    const deletedItem = res.product;
                    const restore = await productApi.restoreByID(deletedItem._id);
                    statusText = restore.statusText;
                    message = restore.message;
                    navigate(PATH_DASHBOARD.product.list);
                } catch (error) {
                    return;
                }
            }
            if(statusText === 'error'){
              try {
                  await confirm({
                      title: message,
                      content: <Alert severity={statusText}>This Product is existed</Alert>
                  });
              } catch (error) {
                  return;
              }
          }
    },
  });
  const {
    values,
    setFieldValue,
    getFieldProps,
    isSubmitting,
    touched,
    errors,
  } = formik;
  const handleDrop = (acceptedFiles) => {
    const files = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFieldValue("images", files);
  };
  const handleRemove = (file) => {
    const filteredFile = values.images.filter((_file) => _file !== file);
    setFieldValue("images", filteredFile);
  };
  const handleRemoveAll = () => {
    setFieldValue("images", []);
  };
  const handleChange = (value) => {
    // Debounce
    if (descriptionRef.current) clearTimeout(descriptionRef.current);
    descriptionRef.current = setTimeout(() => {
      setFieldValue("description", value);
    }, 500);
  };
  return (
    <FormikProvider value={formik}>
      <Form>
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3 }}>
              <div>
                <UploadMultipleFile
                  accept="image/*"
                  files={values.images}
                  showPreview
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                />
                <FormHelperText error sx={{ px: 2, textAlign: "center" }}>
                  {Boolean(touched.images && errors.images) && errors.images}
                </FormHelperText>
              </div>
              <Typography variant="caption">
                Created at: 2021-11-22T08:34:48.760+00:00
                <br />
                Updated at: 2021-11-22T08:34:48.760+00:00
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Name"
                  {...getFieldProps("name")}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  fullWidth
                  label="Infomation"
                  {...getFieldProps("information")}
                  error={Boolean(touched.information && errors.information)}
                  helperText={touched.information && errors.information}
                />
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  {...getFieldProps("price")}
                  error={Boolean(touched.price && errors.price)}
                  helperText={touched.price && errors.price}
                />
                <TextField
                  fullWidth
                  label="Discount (%)"
                  type="number"
                  {...getFieldProps("discount")}
                  error={Boolean(touched.discount && errors.discount)}
                  helperText={touched.discount && errors.discount}
                />
                <TextField
                  fullWidth
                  label="Quantity"
                  type="number"
                  {...getFieldProps("quantity")}
                  error={Boolean(touched.quantity && errors.quantity)}
                  helperText={touched.quantity && errors.quantity}
                />
                <TextField
                  fullWidth
                  label="VATFee"
                  type="number"
                  {...getFieldProps("VATFee")}
                  error={Boolean(touched.VATFee && errors.VATFee)}
                  helperText={touched.VATFee && errors.VATFee}
                />
                <TextField
                  fullWidth
                  label="Limit"
                  {...getFieldProps("limit")}
                  error={Boolean(touched.limit && errors.limit)}
                  helperText={touched.limit && errors.limit}
                />
                <div>
                  <Typography variant="subtitle2">Description</Typography>
                  <QuillEditor
                    id="project-description"
                    onChange={handleChange}
                  />
                </div>
                <Stack alignItems="end">
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    {isEdit ? "Change" : "Save"}
                  </LoadingButton>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
};

export default ProductForm;
