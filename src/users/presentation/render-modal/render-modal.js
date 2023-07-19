import { getUserById } from "../../use-cases/get-user-by-id"
import modalHtml from "./render-modal.html?raw"
import {User} from "../../models/user"
import "./render-modal.css"


let modal, form
let loadedUser = {}

/**
 * 
 * @param {String|Number} id 
 */
export const showModal = async( id ) => {
    modal?.classList.remove('hide-modal')
    loadedUser = {}

    if( !id ) return
    const user = await getUserById( id )
    setFormValues( user )
}

export const hideModal = () => {
    modal?.classList.add('hide-modal')
    form?.reset()
}

/**
 * 
 * @param {User} user 
 */
const setFormValues = ( user ) => {
    form.querySelector('[name="firstName"]').value = user.firstName
    form.querySelector('[name="lastName"]').value = user.lastName
    form.querySelector('[name="balance"]').value = user.balance
    form.querySelector('[name="isActive"]').checked = user.isActive
    loadedUser = user

}



/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userLike) => Promise<void>} callback
 */
export const renderModals = ( element, callback ) => {

    if( modal ) return

    modal = document.createElement('div')
    modal.innerHTML = modalHtml
    modal.classList.add('modal-container', 'hide-modal')
    form = modal.querySelector('form')

    modal.addEventListener('click', (e) => {
        e.stopPropagation()
        if(e.target.className === 'modal-container') hideModal()
    })

    form.addEventListener('submit', async(e) => {
        e.preventDefault()

        const formData = new FormData( form )
        const userLike = { ...loadedUser }


        for (const [ key, value ] of formData){
            if( key === 'balance') {
                userLike[key] = +value 
                continue
            }
            if( key === 'isActive' ){
                userLike[key] = true
                continue
            }
            userLike[key] = value
        }
        if( !userLike['isActive'] ) userLike['isActive'] = false
        
        console.log(userLike)
        await callback( userLike )

        hideModal()

    })

    
    element.append( modal )


}


