import Item from '../../Models/item';

const initialState = {
  items: [],
  userItems: [],
};

export const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const newItem = new Item(
        action.payload.id,
        action.payload.ownerID,
        action.payload.make,
        action.payload.model,
      );
      return {
        items: state.items.concat(newItem),
        userItems: state.userItems.concat(newItem),
      };
    case 'SHOW_ALL':
      return {items: action.payload.items, userItems: action.payload.userItems};
    case 'DELETE_ITEM':
      const itemsIndex = state.items.findIndex(
        (car) => car.id === action.payload,
      );
      const userItemsIndex = state.userItems.findIndex(
        (car) => car.id === action.payload,
      );
      return {
        items: [
          ...state.items.slice(0, itemsIndex),
          ...state.items.slice(itemsIndex + 1),
        ],
        userItems: [
          ...state.userItems.slice(0, userItemsIndex),
          ...state.userItems.slice(userItemsIndex + 1),
        ],
      };
    case 'UPDATE_ITEM':
      const updateIndexItem = state.items.findIndex(
        (car) => car.id === action.payload.id,
      );
      console.log('Index item:' + updateIndexItem);
      const updateItem = new Item(
        action.payload.id,
        state.items[updateIndexItem].ownerID,
        action.payload.make,
        action.payload.model,
      );
      const updatedItems = [...state.items];
      updatedItems[updateIndexItem] = updateItem;
      const userUpdatedItemIndex = state.userItems.findIndex(
        (car) => car.id === action.payload.id,
      );
      const userUpdatedItems = [...state.userItems];
      userUpdatedItems[userUpdatedItemIndex] = updateItem;
      return {
        ...state,
        items: updatedItems,
        userItems: userUpdatedItems,
      };
    case 'RESET_ITEM_LIST':
      return {items: []};
    default:
      return state;
  }
};
