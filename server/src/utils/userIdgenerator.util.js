import crypto from 'crypto'

export const generate_user_id = () => {

    const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let userId = "";

    for (let i = 0; i < 10; i++) {

        const random_index =
        crypto.randomInt(0, characters.length);

        userId += characters[random_index];
    }

    return userId;
};