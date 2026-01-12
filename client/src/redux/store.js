import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    version: 1,
    blacklist: ['user'], // Don't persist user slice directly
};

const userPersistConfig = {
    key: 'user',
    storage,
    blacklist: ['loading', 'error'], // Never persist loading/error states
};

const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, userReducer)
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
