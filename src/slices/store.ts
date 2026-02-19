import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
// Use web storage in client; noop storage in server to avoid SSR errors
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// No-op storage for server or environments without window.localStorage
const createNoopStorage = () => ({
  getItem: (_key: string) => Promise.resolve(null),
  setItem: (_key: string, value: any) => Promise.resolve(value),
  removeItem: (_key: string) => Promise.resolve(),
});

// Determine storage based on environment
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

// Import all reducers from the slices
import LayoutReducer from "./layouts/reducer";
import ProfileReducer from "./auth/profile/reducer";
import CalendarReducer from "./calendar/reducer";
import chatReducer from "./chat/reducer";
import EcommerceReducer from "./ecommerce/reducer";
import ProjectsReducer from "./projects/reducer";
import TasksReducer from "./tasks/reducer";
import CryptoReducer from "./crypto/reducer";
import TicketsReducer from "./tickets/reducer";
import CrmReducer from "./crm/reducer";
import InvoiceReducer from "./invoice/reducer";
import MailboxReducer from "./mailbox/reducer";
import DashboardJobReducer from "./dashboardJob/reducer";
import TeamDataReducer from "./team/reducer";
import FileManagerReducer from "./fileManager/reducer";
import TodosReducer from "./todos/reducer";
import JobReducer from "./jobs/reducer";
import AuthUserReducer from "./user";
import AuthSessionReducer from "./session";

import { apiSlice } from "./api/apiSlice";

// Root reducer type
export interface RootState {
  Layout: ReturnType<typeof LayoutReducer>;
  Profile: ReturnType<typeof ProfileReducer>;
  Calendar: ReturnType<typeof CalendarReducer>;
  Chat: ReturnType<typeof chatReducer>;
  Projects: ReturnType<typeof ProjectsReducer>;
  Ecommerce: ReturnType<typeof EcommerceReducer>;
  Tasks: ReturnType<typeof TasksReducer>;
  Crypto: ReturnType<typeof CryptoReducer>;
  Tickets: ReturnType<typeof TicketsReducer>;
  Crm: ReturnType<typeof CrmReducer>;
  Invoice: ReturnType<typeof InvoiceReducer>;
  Mailbox: ReturnType<typeof MailboxReducer>;
  DashBoardJob: ReturnType<typeof DashboardJobReducer>;
  Team: ReturnType<typeof TeamDataReducer>;
  FileManager: ReturnType<typeof FileManagerReducer>;
  Todos: ReturnType<typeof TodosReducer>;
  Jobs: ReturnType<typeof JobReducer>;
  AuthUser: ReturnType<typeof AuthUserReducer>;
  AuthSession: ReturnType<typeof AuthSessionReducer>;
}

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["Profile", "Layout", "AuthUser", "AuthSession"], // Only persist essential data
};

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Profile: ProfileReducer,
  Calendar: CalendarReducer,
  Chat: chatReducer,
  Projects: ProjectsReducer,
  Ecommerce: EcommerceReducer,
  Tasks: TasksReducer,
  Crypto: CryptoReducer,
  Tickets: TicketsReducer,
  Crm: CrmReducer,
  Invoice: InvoiceReducer,
  Mailbox: MailboxReducer,
  DashBoardJob: DashboardJobReducer,
  Team: TeamDataReducer,
  FileManager: FileManagerReducer,
  Todos: TodosReducer,
  Jobs: JobReducer,
  AuthUser: AuthUserReducer,
  AuthSession: AuthSessionReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;
