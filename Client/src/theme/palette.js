const SECONDARY = {
    light: '#84A9FF',
    main: '#e255fa',
    dark: '#FE4CF6',
    contrastText: '#FFF'
};

const ERROR = {
    lighter: '#FFA48D',
    light: '#FF867B',
    main: '#F53D2D',
    dark: '#D35449',
    darker: '#B72136',
    contrastText: '#FFF'
};

const COMMON = {
    secondary: { ...SECONDARY },
    error: { ...ERROR }
};

const palette = {
    light: {
        ...COMMON,
        background: { paper: '#fff', default: '#f5f8fa' }
    },
    dark: {
        ...COMMON,
        background: { paper: '#242424', default: '#312e2e' }
    }
};

export default palette;
