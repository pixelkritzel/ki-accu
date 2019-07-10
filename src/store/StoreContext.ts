import { createContext } from 'react';

import { EMPTY_STORE_LITERAL, storeModel } from 'store';

export const store = storeModel.create(EMPTY_STORE_LITERAL);

export const StoreContext = createContext(store);
