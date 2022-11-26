import { Container } from '@mui/material';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
//apis
import categoryApi from '../../apis/categoryApi';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { CategoryForm } from '../../components/category';
// path
import { PATH_DASHBOARD } from '../../routes/path';

const CategoryCreate = () => {
    const [category, setCategory] = useState(null);
    const { pathname } = useLocation();
    const isEdit = pathname.includes('edit');
    useEffect(() => {
        const getCategory = async () => {
            const category = await categoryApi.findBySlug(pathname.split('/').pop());
            setCategory(category);
        };
        isEdit && getCategory();
    }, [isEdit, pathname]);
    return (
        <Page title={`${category?.title || 'Create new Category'}`}>
            <Container sx={{ pb: 3 }}>
                <HeaderBreadcrumbs
                    header={!isEdit? 'Create Category' : category? category.title: ''}
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Categoryies', href: PATH_DASHBOARD.category.list },
                    ]}
                />
                <CategoryForm isEdit={isEdit} category={category}/>
            </Container>
        </Page>
    );
};

export default CategoryCreate;
