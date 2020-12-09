import Item from '../../Models/item';

export const addItem = (make, model) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userID = getState().auth.userID;
    const response = await fetch(
      `https://rnfirebaseexample-185fa.firebaseio.com/items.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          make,
          model,
          ownerID: userID,
        }),
      },
    );
    if (!response.ok) {
      throw new Error('Something wrong');
    }
    const resData = await response.json();
    console.log('UserID: ' + userID);
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: resData.name,
        make: make,
        model: model,
        ownerID: userID,
      },
    });
  };
};

export const fetchItems = () => {
  return async (dispatch, getState) => {
    const userID = getState().auth.userID;
    const response = await fetch(
      'https://rnfirebaseexample-185fa.firebaseio.com/items.json',
    );
    const resData = await response.json();
    const fetchItemsList = [];
    for (const i in resData) {
      fetchItemsList.push(
        new Item(i, resData[i].ownerID, resData[i].make, resData[i].model),
      );
    }
    dispatch({
      type: 'SHOW_ALL',
      payload: {
        items: fetchItemsList,
        userItems: fetchItemsList.filter((item) => item.ownerID === userID),
      },
    });
  };
};

export const deleteItem = (id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rnfirebaseexample-185fa.firebaseio.com/items/${id}.json?auth=${token}`,
      {
        method: 'DELETE',
      },
    );
    if (!response.ok) {
      throw new Error('Something wrong');
    }
    dispatch({type: 'DELETE_ITEM', payload: id});
  };
};

export const updateItem = (id, make, model) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rnfirebaseexample-185fa.firebaseio.com/items/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          make,
          model,
        }),
      },
    );
    if (!response.ok) {
      throw new Error('Something wrong');
    }
    dispatch({
      type: 'UPDATE_ITEM',
      payload: {
        id: id,
        make: make,
        model: model,
      },
    });
  };
};
