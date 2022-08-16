import create from 'zustand';
const useStore = create(set => ({
  CartItems: [],
  addItems: CartItem =>
    set(state => {
      const temp = state.CartItems.some(el => el.id === CartItem.id);
      if (!temp) {
        return {
          CartItems: [
            {id: CartItem.id, objectItem: CartItem, quantity: 1},
            ...state.CartItems,
          ],
        };
      } else {
        const index = state.CartItems.findIndex(x => x.id === CartItem.id);
        let tempState = state.CartItems;
        tempState[index].quantity++;
        return {
          CartItems: tempState,
        };
      }
    }),
  removeItems: (id: any) =>
    set(state => ({
      CartItems: state.CartItems.filter(
        (CartItems: {id: any}) => CartItems.id !== id,
      ),
    })),
}));
export default useStore;
