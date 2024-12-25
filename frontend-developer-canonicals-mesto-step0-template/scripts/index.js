import initialCards from "./cards.js"
window.onload = () =>
{
    const placesList = document.querySelector(".places__list")
    const cardTemplate = document.querySelector("#card-template")
    const profilePopup = document.querySelector(".popup_type_edit")
    const cardPopup = document.querySelector(".popup_type_new-card")
    const imagePopup = document.querySelector(".popup_type_image")

    profilePopup.classList.add("popup_is-animated")
    cardPopup.classList.add("popup_is-animated")
    imagePopup.classList.add("popup_is-animated")

    //Функция для создания карточки из шаблона
    function createCard(name, link) {
        const cardCopy = cardTemplate.cloneNode(true).content
        cardCopy.querySelector(".card__image").src = link
        cardCopy.querySelector(".card__title").textContent = name
        cardCopy.querySelector(".card__delete-button").addEventListener("click", event => {
            event.target.closest(".card-block").remove()
        })
        cardCopy.querySelector(".card__like-button").addEventListener("click", event => {
            event.target.classList.toggle("card__like-button_is-active")
        })
        cardCopy.querySelector(".card__image").addEventListener("click", event => {
            openModal(imagePopup)
            imagePopup.querySelector(".popup__image").src = link
            imagePopup.querySelector(".popup__caption").textContent = name
        })
        const card = document.createElement("div")
        card.classList.add("card-block")
        card.append(cardCopy)
        return card
    }

    function appendCard()
    {
        if(arguments.length == 1)
        {
        arguments[0].forEach(elem => {
            placesList.append(createCard(elem.name, elem.link))
        })
        }
        if(arguments.length == 2)
        {
            placesList.prepend(createCard(arguments[0], arguments[1]))
        }
    }

    function openModal(popup) {      
        popup.classList.add('popup_is-opened');
    }

    function closeModal(popup)
    {
        popup.classList.remove('popup_is-opened');
    }

    function handleProfileFormSubmit(event) {
        event.preventDefault()
        document.querySelector(".profile__title").textContent = profilePopup.querySelector(".popup__input_type_name").value
        document.querySelector(".profile__description").textContent = profilePopup.querySelector(".popup__input_type_description").value
        closeModal(profilePopup)
    }

    function handleCardFormSubmit(event)
    {
        event.preventDefault()
        let name = cardPopup.querySelector(".popup__input_type_card-name").value
        let link = cardPopup.querySelector(".popup__input_type_url").value
        initialCards.unshift({name: name, link: link})
        appendCard(name, link)
        closeModal(cardPopup)
    }

    appendCard(initialCards)

    document.querySelector(".profile__edit-button").addEventListener("click", event => {
        openModal(profilePopup)
        profilePopup.querySelector(".popup__input_type_name").value = document.querySelector(".profile__title").textContent
        profilePopup.querySelector(".popup__input_type_description").value = document.querySelector(".profile__description").textContent
    })

    profilePopup.querySelector(".popup__close").addEventListener("click", event => {
        closeModal(profilePopup)
    })

    profilePopup.querySelector(".popup__button").addEventListener("click", handleProfileFormSubmit)

    document.querySelector(".profile__add-button").addEventListener("click", event => {
        openModal(cardPopup)
    })

    cardPopup.querySelector(".popup__close").addEventListener("click", event => {
        closeModal(cardPopup)
    })

    cardPopup.querySelector(".popup__button").addEventListener("click", handleCardFormSubmit)

    imagePopup.querySelector(".popup__close").addEventListener("click", event => {
        closeModal(imagePopup)
    })
}