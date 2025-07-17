import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import React from 'react'
import './CardDetailesModal.css';

export default function CardDetailesModal({ open, onClose, selectedCard }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const address = selectedCard.address;
    const img = selectedCard.image;
    const street = address?.street === undefined ? '' : address.street;
    const houseNumber = address?.houseNumber === undefined ? '' : address.houseNumber;
    const city = address?.city === undefined ? '' : address.city;

    const mapAddressString = `${street} ${houseNumber}, ${city}`;
    const encodedMapAddress = encodeURIComponent(mapAddressString);
    const mapUrl = `https://maps.google.com/maps?q=${encodedMapAddress}&output=embed`;

    return (
        <React.Fragment>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={onClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title" component="div">
                    <h1 className="modal-title">Business Details</h1>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText component="div" className="modal-content-text">
                        {img?.url && <img src={img.url} alt={img.alt} className="modal-image" />}
                        <h2 className="modal-business-name">{selectedCard.title}</h2>
                        <h3 className="modal-subtitle">{selectedCard.subtitle}</h3>
                        <p className="modal-description">Description: {selectedCard.description}</p>
                        <p className="modal-detail">Phone: {selectedCard.phone}</p>
                        <p className="modal-detail">Email: {selectedCard.email}</p>
                        <p className="modal-detail">Web: {selectedCard.web}</p>
                        <p className="modal-detail">State: {address?.state}</p>
                        <p className="modal-detail">Country: {address?.country}</p>
                        <p className="modal-detail">City: {address?.city}</p>
                        <p className="modal-detail">Street: {address?.street} {address?.houseNumber}</p>
                        <p className="modal-detail">Zip: {address?.zip}</p>
                        <iframe
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={mapUrl}
                            className="modal-map"
                        >
                        </iframe>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} autoFocus>
                        Back To Cards
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}