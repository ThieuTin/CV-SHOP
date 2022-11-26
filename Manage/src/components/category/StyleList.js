import MaterialTable from '@material-table/core';
import { AddCircle, Edit, Delete } from '@mui/icons-material';

const columns = [
    {
        field: 'title',
        title: 'Style',
        width: '75%'
    },
    {
        field: 'displayOrder',
        title: 'Dislay order'
    }
];

const rows = [
    { id: '1', title: 'Classis', displayOrder: 1 },
    { id: '2', title: 'Morden', displayOrder: 2 },
    { id: '3', title: 'Classis', displayOrder: 3 },
    { id: '4', title: 'Classis', displayOrder: 4 },
    { id: '5', title: 'Classis', displayOrder: 5 },
    { id: '6', title: 'Classis', displayOrder: 6 }
];

const icons = {
    Add: () => <AddCircle color='success' />,
    Edit: () => <Edit color='warning' />,
    Delete: () => <Delete color='error' />
};

const options = {
    selection: true,
    addRowPosition: 'first',
    actionsColumnIndex: -1,
    tableLayout: 'fixed'
};

const actions = [
    {
        tooltip: 'Remove All Selected',
        icon: () => <Delete color='error' />,
        onClick: (evt, data) => alert('You want to delete rows')
    }
];

const StyleList = () => {
    return (
        <MaterialTable
            title='Styles for your Category'
            columns={columns}
            data={rows}
            icons={icons}
            options={options}
            actions={actions}
            editable={{
                onRowAdd: newRow => new Promise((resolve, reject) => {
                    console.log(newRow);
                    resolve();
                }),
                onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
                    console.log(newRow, oldRow);
                    resolve();
                }),
                onRowDelete: oldRow => new Promise((resolve, reject) => {
                    console.log(oldRow);
                    resolve();
                })
            }}
        />
    );
};

export default StyleList;
