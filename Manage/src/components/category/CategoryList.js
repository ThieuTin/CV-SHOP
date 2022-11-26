import { useNavigate } from 'react-router-dom';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import MaterialTable from '@material-table/core';
import { Tooltip, Alert, Typography } from '@mui/material';
import { AddCircle, Edit, Delete } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useConfirm } from "material-ui-confirm";
//apis
import categoryApi from '../../apis/categoryApi';
// path
import { PATH_DASHBOARD } from '../../routes/path';
//utils
import { fDate } from '../../utils/formatDate';
import { distinguishImage } from '../../utils/formatImage';

const columns = [
    {
        field: 'title',
        title: 'Title',
        width: '40%'
    },
    {
        field: 'image',
        title: 'Image',
        render: row => (
            <Tooltip
                disableFocusListener
                placement='left'
                title={<img src={distinguishImage(row.image)} alt='' />}
            >
                <img
                    src={distinguishImage(row.image)}
                    alt=''
                    style={{
                        width: '80px',
                        height: '80px'
                    }}
                />
            </Tooltip>

        ),
        width: '20%'
    },
    {
        field: 'banners',
        title: 'Banners',
        render: row => row.banners.length > 0 && (
            <Tooltip
                disableFocusListener
                placement='left'
                title={<img src={distinguishImage(row.banners[0])} alt='' />}
            >
                <img
                    src={distinguishImage(row.banners[0])}
                    alt=''
                    style={{
                        width: '80px',
                        height: '80px'
                    }}
                />
            </Tooltip>
        ),
        width: '20%'
    },
    {
        field: 'createdAt',
        title: 'Created At',
        width: '20%',
        render: row => (
            <Typography variant='body2'>{fDate(row.createdAt)}</Typography>
        )
    }
];

const options = {
    selection: true,
    addRowPosition: 'first',
    actionsColumnIndex: -1,
    tableLayout: 'fixed',
    exportMenu: [{
        label: 'Export PDF',
        exportFunc: (cols, datas) => ExportPdf(cols, datas, 'CategoryPdf')
    }, {
        label: 'Export CSV',
        exportFunc: (cols, datas) => ExportCsv(cols, datas, 'CategoryCsv')
    }]
};

const CategoryList = () => {
    const confirm = useConfirm();
    const navigate = useNavigate();
    const [categories, setCategories] = useState(null);
    useEffect(() => {
        const getCategories = async () => {
            const categories = await categoryApi.findAll();
            setCategories(categories);
            console.log(categories);
        }
        getCategories();
    }, []);
    const handleDelete = async _categoryID => {
        try {
            await confirm({
                title: "Are you sure to Delete this Category?",
                content: <Alert severity="error">This Category will move to recycle bin</Alert>,
                confirmationButtonProps: {
                    color: "error",
                },
            });
            const res = await categoryApi.deleteCategorybyID(_categoryID);
            const { categoryID } = res;
            const newCategory = categories.filter(_category => !categoryID.includes(_category._id));
            setCategories(newCategory);
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeleteSelected = async _data => {
        try {
            await confirm({
                title: 'Are you sure to Delete selected Category?',
                content: <Alert severity='error'>Selected Category will move to recycle bin</Alert>,
                confirmationButtonProps: {
                    color: 'error'
                }
            });
            const deleteIds = _data.map(item => item._id);
            const res = await categoryApi.deletedCategoryAll(deleteIds);
            const { categoryIDs } = res;
            const newCategory = categories.filter(_category => !categoryIDs.includes(_category._id));
            setCategories(newCategory);
        } catch (error) {

        }
    }
    return (
        <>
            {categories && (
                <MaterialTable
                    title='Categories'
                    columns={columns}
                    data={categories}
                    options={options}
                    actions={[
                        {
                            icon: () => <Edit color='warning' />,
                            tooltip: 'View and Edit',
                            onClick: (event, row) => navigate(`${PATH_DASHBOARD.category.edit}/${row.slug}`),
                            position: 'row'
                        },
                        {
                            icon: () => <Delete color='error' />,
                            tooltip: 'Delete',
                            onClick: (event, row) => handleDelete(row._id),
                            position: 'row'
                        },
                        {
                            icon: () => <AddCircle color='success' />,
                            tooltip: 'Add',
                            isFreeAction: true,
                            onClick: () => navigate(PATH_DASHBOARD.category.create)
                        },
                        {
                            icon: () => <Delete color='error' />,
                            tooltip: 'Delete selected',
                            onClick: (evt, data) => handleDeleteSelected(data),
                        }
                    ]}
                />
            )}
            {!categories && "Loading..."}
        </>
    );
};

export default CategoryList;
