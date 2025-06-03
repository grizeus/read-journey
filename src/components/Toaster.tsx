import { Toaster } from "react-hot-toast";

const CustomToaster = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        success: {
          style: {
            color: "var(--color-ivory)",
            backgroundColor: "var(--color-neon)",
            fontWeight: "bold",
            padding: "8px 30px",
            borderRadius: "10px",
          },
          iconTheme: {
            primary: "var(--color-ivory)",
            secondary: "var(--color-neon)",
          },
          duration: 3000,
        },
        error: {
          style: {
            color: "var(--color-ivory)",
            backgroundColor: "var(--color-red-500)",
            fontWeight: "bold",
            padding: "8px 30px",
            borderRadius: "10px",
          },
          iconTheme: {
            primary: "var(--color-ivory)",
            secondary: "var(--color-red-500)",
          },
          duration: 3000,
        },
      }}
    />
  );
};

export default CustomToaster;
