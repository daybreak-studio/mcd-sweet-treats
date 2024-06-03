export type ToastOptions = {
  text: string;
  duration?: number;
  canDismiss?: boolean;
  icon?: React.ReactNode;
};

export type ToastOptionsIdentifiable = ToastOptions & {
  id: string;
};

export const defaultToastOptions = {
  text: "",
  canDismiss: false,
  icon: undefined,
};
