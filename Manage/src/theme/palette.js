// BLACK
const PRIMARY = {
    lighter: '#666565',
    light: '#3B3B3B',
    main: '#1B1A1A',
    dark: '#0B0B0A',
    darker: '#000000',
    contrastText: '#fff'
};

// GREEN
// const PRIMARY = {
//     lighter: '#C8FACD',
//     light: '#5BE584',
//     main: '#00AB55',
//     dark: '#007B55',
//     darker: '#005249',
//     contrastText: '#fff'
// };

const SECONDARY = {
    lighter: '#FFA48D',
    light: '#FF867B',
    main: '#F53D2D',
    dark: '#D35449',
    darker: '#B72136',
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

const SUCCESS = {
    lighter: '#C8FACD',
    light: '#5BE584',
    main: '#00AB55',
    dark: '#007B55',
    darker: '#005249',
    contrastText: '#fff'
};

const WARNING = {
    lighter: '#FFE79E',
    light: '#FFDD78',
    main: '#EDDE62',
    dark: '#DFBD57',
    darker: '#C7A540',
    contrastText: '#fff'
};

const COMMON = {
    primary: { ...PRIMARY },
    secondary: { ...SECONDARY },
    error: { ...ERROR },
    success: { ...SUCCESS },
    warning: {...WARNING}
};

const palette = {
    ...COMMON,
    background: { paper: '#FFF', default: '#FFF' }
};

export default palette;
