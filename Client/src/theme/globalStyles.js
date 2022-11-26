import { withStyles } from "@mui/styles";

const GlobalStyles = withStyles((theme) => ({
    '@global': {
        'html': {
            scrollBehavior: 'smooth'
        },
        '::-webkit-scrollbar': {
            width: '11px',
            height: '11px'
        },
        '::-webkit-scrollbar-thumb': {
            background: 'gray',
            borderRadius: '10px',
            border: `2px solid ${theme.palette.background.default}`
        },
        '::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#bbb'
        },
        '*': {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
            fontFamily: 'Quicksand',
            listStyle: 'none'
        },
        a: {
            textDecoration: 'none',
            color: theme.palette.text.primary
        },
        '.MuiBadge-badge': {
            backgroundColor: '#f76254',
            color: '#fff'
        },
        '.wide-container': {
            padding: '0 5px !important'
        },
        '.slick-slider:hover button': {
            opacity: 1
        },
        '.slick-dots li.slick-active div': {
            backgroundColor: '#f53d2d'
        },
        '.quantity-input': {
            width: '40px'
        },
        '.quantity-button, .quantity-input': {
            height: '30px',
            fontSize: '14px',
            textAlign: 'center',
            outline: 'none',
            transition: 'border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s',
            border: `1px solid ${theme.palette.background.default}`,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary
        },
        '.cart-col-1': {
            width: '368px',
            padding: '0 15px'
        },
        '.cart-col-2': {
            width: '200px',
            padding: '0 15px'
        },
        '.cart-col-3': {
            width: '140px',
            padding: '0 15px'
        },
        '.cart-col-4': {
            width: '135px',
            padding: '0 15px'
        },
        [theme.breakpoints.down('md')]: {
            '.wide-container': {
                padding: '0 20px !important'
            },
        }
    }
}))(() => null);

export default GlobalStyles;
