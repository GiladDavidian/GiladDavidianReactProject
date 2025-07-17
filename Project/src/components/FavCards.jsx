import { useContext, useState } from "react";
import { MyContext } from "../App";
import { FaHeart, FaInfoCircle, FaRegHeart, FaTrash } from 'react-icons/fa';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import CardDetailesModal from "./CardDetailesModal";

export default function FavCards({ currentUserId, cards, user, searchTerm }) {
    const { snackbar, setCards } = useContext(MyContext);
    const [openModal, setOpenModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const likeCards = cards.filter(card => card.likes.includes(currentUserId));
    const filterLikeCards = searchTerm ? likeCards.filter(card => card.title.includes(searchTerm)) : likeCards

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
                const userId = user._id
                const isLiked = responseData.likes.includes(userId)
                isLiked ? snackbar('You liked!') : snackbar('You Unliked!')
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
        const resDelete = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`, {
            method: 'DELETE',
            headers: {
                'x-auth-token': token
            }
        });

        if (resDelete.ok) {
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
            <h1 className="titlePage">Favorite Cards</h1>
            <hr className="cardsHR" />

            <div className="containerCards">
                {filterLikeCards.map(likeCard =>
                    <div key={likeCard._id} className="card">
                        <img src={likeCard.image.url} alt={likeCard.image.alt} />
                        <h1>{likeCard.title}</h1>
                        <h2>{likeCard.subtitle}</h2>
                        <p>Phone: {likeCard.phone}</p>
                        <p>Address: {likeCard.address.street}</p>
                        <p>Card Number: {likeCard.bizNumber}</p>
                        <div className="containerBtns">
                            <button className="containerAboutCard" onClick={() => {
                                setSelectedCard(likeCard)
                                setOpenModal(true)
                            }}>
                                <FaInfoCircle className="aboutCard" />
                            </button>
                            {user && (
                                <>
                                    {user.isAdmin && (
                                        <>
                                            <button className="containerDelete" onClick={() => deleteCrad(likeCard._id)}>
                                                <FaTrash className="delete" />
                                            </button>
                                            <button className="containerEdit" onClick={(ev) => onUpdateCard(likeCard._id, ev)}>
                                                <EditIcon className="edit" />
                                            </button>
                                        </>
                                    )}
                                    <button className="containerHeart" onClick={() => like(likeCard._id)}>
                                        {likeCard.likes && user && likeCard.likes.includes(user._id) ? <FaHeart className="fullHeart" /> : <FaRegHeart className="heart" />}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <CardDetailesModal open={openModal} selectedCard={selectedCard} onClose={() => setOpenModal(false)} />
        </>
    )
}