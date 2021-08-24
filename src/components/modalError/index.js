/* eslint-disable */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

export default function ResponsiveDialog({ open, error, title, handleClose, }) {
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
                {Array.isArray(error) ?
                    error.map((item, key) => (
                        <List key={key} value={item} >
                            <ListItem >
                                -{item}
                            </ListItem>
                            <Divider />
                        </List>)) :
                    <DialogContent> -{error}</DialogContent>}
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}