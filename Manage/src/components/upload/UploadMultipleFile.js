import PropTypes from 'prop-types';
import { styled, alpha } from '@mui/material/styles';
import { Stack, Box, Typography, Paper, Button, Link, List, ListItem, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';

// utils
import { distinguishImage } from '../../utils/formatImage';

const propTypes = {
    file: PropTypes.array,
    showPreview: PropTypes.bool,
    onRemove: PropTypes.func,
    onRemoveAll: PropTypes.func,
    sx: PropTypes.object
};

const UploadMultipleFile = ({ files, showPreview = false, onRemove, onRemoveAll, sx, ...other }) => {
    const hasFile = files.length > 0;
    const { getRootProps, getInputProps, fileRejections } = useDropzone({
        ...other
    });
    const ShowRejectionItems = () => (
        <Paper
            variant='outlined'
            sx={{
                py: 1,
                px: 2,
                my: 2,
                borderColor: 'error.light',
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.08)
            }}
        >
            {fileRejections.map(({ file, errors }) => {
                const { path, size } = file;
                return (
                    <Box key={path} sx={{ my: 1 }}>
                        <Typography variant='subtitle2' noWrap>
                            {path} - {size}
                        </Typography>
                        {errors.map(e => (
                            <Typography key={e.code} variant='caption' component='p'>
                                - {e.message}
                            </Typography>
                        ))}
                    </Box>
                );
            })}
        </Paper>
    );
    return (
        <RootStyle sx={sx}>
            <DropZoneStyle
                {...getRootProps()}
            >
                <input {...getInputProps()} />
                <Box sx={{
                    p: 3,
                    ml: { md: 2 }
                }}
                >
                    <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                        Drag image here or&nbsp;
                        <Link underline='always'>Choose</Link>&nbsp; from device
                    </Typography>
                </Box>
            </DropZoneStyle>
            {fileRejections.length > 0 && <ShowRejectionItems />}
            <List disablePadding sx={{ ...(hasFile && { my: 3 }) }}>
                {files.map(file => {
                    const { name, preview } = file;
                    const key = typeof file === 'string' ? file : name;

                    if (showPreview) {
                        return (
                            <ListItem
                                key={key}
                                component={'div'}
                                sx={{
                                    p: 0,
                                    m: 0.5,
                                    width: 80,
                                    height: 80,
                                    borderRadius: 1.5,
                                    overflow: 'hidden',
                                    position: 'relative',
                                    display: 'inline-flex'
                                }}
                            >
                                <Paper
                                    variant='outlined'
                                    component='img'
                                    src={typeof file === 'string' ? distinguishImage(file) : preview}
                                    sx={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }}
                                />
                                <Box sx={{ top: 4, right: 4, position: 'absolute' }}>
                                    <IconButton
                                        size='small'
                                        onClick={() => onRemove(file)}
                                        sx={{
                                            p: 0,
                                            color: 'common.white',
                                            bgcolor: theme => alpha(theme.palette.grey[900], 0.72),
                                            '&:hover': {
                                                bgcolor: theme => alpha(theme.palette.grey[900], 0.48)
                                            }
                                        }}
                                    >
                                        <Close />
                                    </IconButton>
                                </Box>
                            </ListItem>
                        );
                    }

                    return <div>Images</div>
                    // return (
                    //     <ListItem
                    //         key={key}
                    //         component={'div'}
                    //         sx={{
                    //             my: 1,
                    //             py: 0.75,
                    //             px: 2,
                    //             borderRadius: 1,
                    //             border: theme => `solid 1px ${theme.palette.divider}`,
                    //             bgcolor: 'background.paper'
                    //         }}
                    //     >
                    //         <ListItemIcon>
                    //             a
                    //         </ListItemIcon>
                    //         <ListItemText
                    //             primary={isString(file) ? file : name}
                    //             secondary={isString(file) ? '' : fData(size)}
                    //             primaryTypographyProps={{ variant: 'subtitle2' }}
                    //             secondaryTypographyProps={{ variant: 'caption' }}
                    //         />
                    //         <ListItemSecondaryAction>
                    //             <MIconButton edge="end" size="small" onClick={() => onRemove(file)}>
                    //                 <Icon icon={closeFill} />
                    //             </MIconButton>
                    //         </ListItemSecondaryAction>
                    //     </ListItem>
                    // );
                })}
            </List>
            {hasFile && (
                <Stack direction='row' justifyContent='flex-end'>
                    <Button
                        color='error'
                        onClick={onRemoveAll}
                        sx={{ mr: 1.5 }}
                    >
                        Remove all
                    </Button>
                </Stack>
            )}
        </RootStyle>
    );
};

const RootStyle = styled('div')(({ theme }) => ({
    width: '100%',
    margin: 'auto',
    padding: theme.spacing(1)
}));

const DropZoneStyle = styled('div')({
    zIndex: 0,
    width: '100%',
    height: '100%',
    outline: 'none',
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px dashed rgba(145, 158, 171, 0.32)',
    '& > *': { width: '100%', height: '100%' },
    '&:hover': {
        cursor: 'pointer',
        '& .placeholder': {
            zIndex: 9
        }
    }
});

UploadMultipleFile.propTypes = propTypes;

export default UploadMultipleFile;
