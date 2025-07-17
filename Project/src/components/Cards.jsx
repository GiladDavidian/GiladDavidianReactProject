import { useContext, useState } from "react";
import { MyContext } from "../App";
import { FaHeart, FaRegHeart, FaTrash, FaInfoCircle } from 'react-icons/fa';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from "react-router-dom";
import CardDetailesModal from "./CardDetailesModal";
import './Cards.css';


export default function Cards({ user, searchTerm, cards }) {
    const { snackbar, setCards } = useContext(MyContext);
    const [openModal, setOpenModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const filterCards = searchTerm ? cards.filter(card => card.title.includes(searchTerm)) : cards


    const like = async id => {
        try {
            const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            });

            if (res.ok) {
                const responseData = await res.json();
                snackbar('You liked!')
                setCards(prevCards =>
                    prevCards.map(card =>
                        card._id === id
                            ? { ...card, likes: responseData.likes || card.likes }
                            : card
                    )
                );

            } else {
                const errorText = await res.text();
                console.error(`בקשת PATCH נכשלה: ${res.status} ${res.statusText}`, errorText);
            }
        } catch (error) {
            console.error("שגיאה במהלך בקשת PATCH:", error);
        }
    };

    const deleteCrad = async id => {
        const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`, {
            method: 'DELETE',
            headers: {
                'x-auth-token': token
            }
        });

        if (res.ok) {
            setCards(prevCards => prevCards.filter(card => card._id !== id));
            snackbar('Card delete!');
        }
    }
    const onUpdateCard = (id, ev) => {
        ev.preventDefault();
        navigate(`/updatecard/${id}`)
    }

    return (
        <>
            <h1 className="titlePage">Cards Page</h1>
            <hr className="cardsHR" />
            <div className="containerCards">
                {filterCards.map(card => {
                    return (
                        <div key={card._id} className="card">
                            <img src={card.image.url} alt={card.image.alt} />
                            <h1>{card.title}</h1>
                            <h2>{card.subtitle}</h2>
                            <p>Phone: {card.phone}</p>
                            <p>Address: {card.address.street}</p>
                            <p>Card Number: {card.bizNumber}</p>
                            <div className="containerBtns">
                                <button className="containerAboutCard" onClick={() => {
                                    setSelectedCard(card)
                                    setOpenModal(true)
                                }}>
                                    <FaInfoCircle className="aboutCard" />
                                </button>
                                {user && (
                                    <>
                                        {user.isAdmin && (
                                            <>
                                                <button className="containerDelete" onClick={() => deleteCrad(card._id)}>
                                                    <FaTrash className="delete" />
                                                </button>
                                                <button className="containerEdit" onClick={(ev) => onUpdateCard(card._id, ev)}>
                                                    <EditIcon className="edit" />
                                                </button>
                                            </>
                                        )}
                                        <button className="containerHeart" onClick={() => like(card._id)}>
                                            {card.likes && user && card.likes.includes(user._id) ? <FaHeart className="fullHeart" /> : <FaRegHeart className="heart" />}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div >
            {user &&
                <>
                    {user.isBusiness && (
                        <Link to={"/addcard"}>
                            <button className="addCard">+</button>
                        </Link>
                    )}
                </>
            }
            <CardDetailesModal open={openModal} selectedCard={selectedCard} onClose={() => setOpenModal(false)} />
        </>
    );
}

