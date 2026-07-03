import {
    Bell,
    Check,
    CheckCheck,
    Heart,
    Pencil,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    type: "success" | "update" | "welcome";
    read: boolean;
}

const initialNotifications: Notification[] = [
    {
        id: "1",
        title: "Place added successfully",
        message: 'New place "Eiffel Tower" has been added.',
        time: "2 minutes ago",
        type: "success",
        read: false,
    },
    {
        id: "2",
        title: "Place updated",
        message: '"Tokyo Tower" has been updated.',
        time: "15 minutes ago",
        type: "update",
        read: false,
    },
    {
        id: "3",
        title: "Welcome back!",
        message: "We're happy to see you again.",
        time: "1 hour ago",
        type: "welcome",
        read: true,
    },
];

export default function NotificationsDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifications, setNotifications] =
        useState<Notification[]>(initialNotifications);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(
        (notification) => !notification.read,
    ).length;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleMarkAllAsRead = () => {
        setNotifications((prev) =>
            prev.map((notification) => ({
                ...notification,
                read: true,
            })),
        );
    };

    const handleNotificationClick = (id: string) => {
        setNotifications((prev) =>
            prev.map((notification) =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification,
            ),
        );
    };

    const getNotificationIcon = (type: Notification["type"]) => {
        if (type === "success") {
            return (
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                    <Check size={22} />
                </div>
            );
        }

        if (type === "update") {
            return (
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-400">
                    <Pencil size={20} />
                </div>
            );
        }

        return (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-violet-400">
                <Heart size={21} />
            </div>
        );
    };

    return (
        <div ref={dropdownRef} className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-slate-300 transition hover:bg-slate-900 hover:text-white"
            >
                <Bell size={22} />

                {unreadCount > 0 && (
                    <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-600 px-1 text-[11px] font-bold text-white ring-2 ring-[#020817]">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute -right-25 md:right-0 top-[calc(100%+12px)] z-100 w-[calc(100vw-2rem)] max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-[#07101f] shadow-2xl shadow-black/40 sm:w-105">
                    <div className="flex items-center justify-between gap-4 border-b border-slate-800 px-5 py-4">
                        <div>
                            <h3 className="text-lg font-bold text-white">
                                Notifications
                            </h3>

                            <p className="mt-1 text-xs text-slate-500">
                                {unreadCount > 0
                                    ? `${unreadCount} unread notifications`
                                    : "You're all caught up"}
                            </p>
                        </div>

                        {unreadCount > 0 && (
                            <button
                                type="button"
                                onClick={handleMarkAllAsRead}
                                className="flex shrink-0 cursor-pointer items-center gap-1.5 text-sm font-medium text-violet-400 transition hover:text-violet-300"
                            >
                                <CheckCheck size={17} />
                                <span className="hidden sm:inline">
                                    Mark all as read
                                </span>
                            </button>
                        )}
                    </div>

                    <div className="max-h-105 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <button
                                    key={notification.id}
                                    type="button"
                                    onClick={() =>
                                        handleNotificationClick(notification.id)
                                    }
                                    className={`relative flex w-full cursor-pointer gap-4 border-b border-slate-800/70 px-5 py-4 text-left transition last:border-b-0 hover:bg-slate-800/40 ${!notification.read ? "bg-violet-500/4" : ""
                                        }`}
                                >
                                    {getNotificationIcon(notification.type)}

                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-start justify-between gap-3">
                                            <p className="font-semibold text-white">
                                                {notification.title}
                                            </p>

                                            {!notification.read && (
                                                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-violet-500" />
                                            )}
                                        </div>

                                        <p className="mt-1 text-sm leading-5 text-slate-400">
                                            {notification.message}
                                        </p>

                                        <p className="mt-2 text-xs text-slate-500">
                                            {notification.time}
                                        </p>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="flex flex-col items-center px-6 py-12 text-center">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-800">
                                    <Bell size={24} className="text-slate-400" />
                                </div>

                                <p className="mt-4 font-semibold text-white">
                                    No notifications
                                </p>

                                <p className="mt-1 text-sm text-slate-500">
                                    New activity will appear here.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}