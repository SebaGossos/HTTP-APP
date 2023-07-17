import { User } from "../models/user";

/**
 * 
 * @param {Like<User>} localHostUser 
 * @returns {User}
 */
export const localHostUserToModel = ( localHostUser ) => {
    const {
        avatar,
        balance,
        first_name,
        id,
        isActive,
        last_name,
    } = localHostUser

    return new User({
        avatar,
        balance,
        firstName: first_name,
        id,
        isActive,
        lastName: last_name,
    })
}



