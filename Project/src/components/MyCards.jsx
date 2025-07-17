import { useContext, useEffect, useState } from "react";
import { MyContext } from "../App";
import { FaHeart, FaInfoCircle, FaRegHeart, FaTrash } from 'react-icons/fa';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import CardDetailesModal from "./CardDetailesModal";

export default function MyCards({ user, searchTerm }) {
    const [myCards, setMyCards] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const { snackbar, setCards, setIsLoader } = useContext(MyContext);
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const filterMyCards = searchTerm ? myCards.filter(card => card.title.includes(searchTerm)) : myCards

    const getMyCardsData = async () => {
        setIsLoader(true)

        const res = await fetch(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards`, {
            headers: {
                'x-auth-token': token
            }
        });
        if (res.ok) {
            const data = await res.json()
            setMyCards(data)
        }
        setIsLoader(false)
    }

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

    useEffect(() => {
        getMyCardsData()
    }, [])

    return (
        <>
            <h1 className="titlePage">My Cards</h1>
            <hr className="cardsHR" />
            <div className="containerCards">
                {filterMyCards.map(myCard =>
                    <div key={myCard._id} className="card">
                        <img src={myCard.image.url} alt={myCard.image.alt} />
                        <h1>{myCard.title}</h1>
                        <h2>{myCard.subtitle}</h2>
                        <p>Phone: {myCard.phone}</p>
                        <p>Address: {myCard.address.street}</p>
                        <p>Card Number: {myCard.bizNumber}</p>
                        <div className="containerBtns">
                            <>
                                <button className="containerAboutCard" onClick={() => {
                                    setSelectedCard(myCard)
                                    setOpenModal(true)
                                }}>
                                    <FaInfoCircle className="aboutCard" />
                                </button>
                                <button className="containerDelete" onClick={() => deleteCrad(myCard._id)}>
                                    <FaTrash className="delete" />
                                </button>

                                <button className="containerEdit" onClick={(ev) => onUpdateCard(myCard._id, ev)}>
                                    <EditIcon className="edit" />
                                </button>

                                <button className="containerHeart" onClick={() => like(myCard._id)}>
                                    {myCard.likes && user && myCard.likes.includes(user._id) ? <FaHeart className="fullHeart" /> : <FaRegHeart className="heart" />}
                                </button>
                            </>
                        </div>
                    </div>
                )}
            </div>
            <CardDetailesModal open={openModal} selectedCard={selectedCard} onClose={() => setOpenModal(false)} />
        </>
    )
}
