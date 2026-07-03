import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type NotificationType = "success" | "update" | "welcome" | "error";

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  type: NotificationType;
  read: boolean;
}

interface NotificationsState {
  notifications: AppNotification[];
}

const initialState: NotificationsState = {
  notifications: [],
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (
      state,
      action: PayloadAction<{
        title: string;
        message: string;
        type: NotificationType;
      }>,
    ) => {
      const newNotification: AppNotification = {
        id: crypto.randomUUID(),
        title: action.payload.title,
        message: action.payload.message,
        type: action.payload.type,
        createdAt: new Date().toISOString(),
        read: false,
      };

      state.notifications.unshift(newNotification);
    },

    markNotificationAsRead: (
      state,
      action: PayloadAction<{ notificationId: string }>,
    ) => {
      const notification = state.notifications.find(
        (item) => item.id === action.payload.notificationId,
      );

      if (notification) {
        notification.read = true;
      }
    },

    markAllNotificationsAsRead: (state) => {
      state.notifications.forEach((notification) => {
        notification.read = true;
      });
    },

    removeNotification: (
      state,
      action: PayloadAction<{ notificationId: string }>,
    ) => {
      state.notifications = state.notifications.filter(
        (item) => item.id !== action.payload.notificationId,
      );
    },

    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

const notificationReducer = notificationsSlice.reducer;

export const {
  addNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  removeNotification,
  clearNotifications,
} = notificationsSlice.actions;

export default notificationReducer;