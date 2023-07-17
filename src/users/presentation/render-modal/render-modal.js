import "./render-modal.css"
import modalHtml from "./render-modal.html?raw"


let modal, form

// TODO: cargar usuario por id.
export const showModal = () => {
    modal?.classList.remove('hide-modal')
}

export const hideModal = () => {

    modal?.classList.add('hide-modal')

    form?.reset()
    
}



/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderModals = ( element ) => {

    if( modal ) return

    modal = document.createElement('div')
    modal.innerHTML = modalHtml
    modal.classList.add('modal-container', 'hide-modal')
    form = modal.querySelector('form')

    modal.addEventListener('click', (e) => {
        e.stopPropagation()
        if(e.target.className === 'modal-container') hideModal()
    })

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const formData = new FormData( form )
        const userLike = {}


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
        
        // console.log(userLike)
        // TODO: gurdar usuario

        hideModal()

    })

    
    element.append( modal )


}


