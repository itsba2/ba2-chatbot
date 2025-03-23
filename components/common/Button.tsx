interface ButtonProps {
    type?: "submit" | "button" | "reset";
    variant?: "primary" | "secondary";
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
}

export default function Button({
    type = "button",
    variant = "primary",
    disabled = false,
    onClick = () => {},
    className,
    children,
}: ButtonProps) {
    const variants = {
        enabled: {
            primary: "bg-teal-500 hover:bg-teal-700 text-white cursor-pointer",
            secondary: "bg-orange-500 hover:bg-orange-700 text-gray-900 cursor-pointer",
        },
        disabled: {
            primary: "bg-gray-300 text-gray-900 cursor-not-allowed",
            secondary: "bg-gray-300 text-gray-900 cursor-not-allowed",
        },
    };
    const state = disabled ? "disabled" : "enabled";
    const styles = `${variants[state][variant]} rounded p-2 duration-150 ${className}`;
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={styles}
        >
            {children}
        </button>
    );
}
