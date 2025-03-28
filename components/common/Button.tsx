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
            primary: "bg-primary hover:bg-primary-action text-onprimary cursor-pointer",
            secondary:
                "border border-onsecondary hover:bg-secondary-action text-onsecondary cursor-pointer",
        },
        disabled: {
            primary: "bg-surface text-disabled cursor-not-allowed",
            secondary: "bg-surface text-disabled cursor-not-allowed",
        },
    };
    const state = disabled ? "disabled" : "enabled";
    const styles = `${variants[state][variant]} rounded min-w-12 p-2 ease-in duration-150 ${className}`;
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
