import { atom} from 'nanostores';

const initialState = []
export const $isCartOpen = atom(initialState);

export const upateState = (newData)=>{
    $isCartOpen.set(newData)
}

