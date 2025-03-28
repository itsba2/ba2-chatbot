import React, { useEffect, useRef, useState } from "react";

interface SelectOptions {
    value: string;
    label: string;
}

interface SelectProps {
    options: SelectOptions[];
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
}
export default function Select({
    options,
    value,
    onChange,
    placeholder = "Select an option",
    disabled = false,
    className = "",
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find((option) => option.value === value);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        function handlePressEscape(event: KeyboardEvent) {
            if (event.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keypress", handlePressEscape);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keypress", handlePressEscape);
        };
    }, [isOpen]);

    const handleSelect = (optionValue: string) => {
        const syntheticEvent = {
            target: {
                value: optionValue,
                name: "select",
                type: "select-one",
            },
            currentTarget: {
                value: optionValue,
                name: "select",
                type: "select-one",
            },
            preventDefault: () => {},
            stopPropagation: () => {},
        } as React.ChangeEvent<HTMLSelectElement>;

        onChange(syntheticEvent);
        setIsOpen(false);
    };

    const buttonStyles = `flex items-center justify-between w-full px-4 py-2 text-left bg-paper border border-gray-300 rounded-md shadow-sm focus:outline-none ${
        disabled ? "cursor-not-allowed" : ""
    }`;
    return (
        <div
            className={`relative text-sm ${className}`}
            onKeyDown={(event) => {
                if (event.key === "Escape" && isOpen) {
                    setIsOpen(false);
                }
            }}
            ref={wrapperRef}
        >
            <button
                type="button"
                className={buttonStyles}
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className={!selectedOption ? "text-hint" : ""}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <svg
                    className={`w-5 h-5 ml-2 -mr-1 ease-in-out duration-300 ${
                        isOpen ? "transform rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {isOpen && (
                <ul
                    className="absolute z-10 w-full mt-1 border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none"
                    tabIndex={-1}
                    role="listbox"
                >
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={`px-4 py-2 cursor-pointer ${
                                option.value === value
                                    ? "bg-secondary hover:bg-secondary-action"
                                    : "bg-paper hover:bg-paper-action"
                            }`}
                            onClick={() => handleSelect(option.value)}
                            role="option"
                            aria-selected={option.value === value}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
