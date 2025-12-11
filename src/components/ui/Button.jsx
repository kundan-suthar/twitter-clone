import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-full";

    const variants = {
        primary: "bg-[#1d9bf0] hover:bg-[#1a8cd8] text-white shadow-sm",
        secondary: "bg-white text-black hover:bg-zinc-200",
        outline: "bg-transparent border border-zinc-600 text-[#eff3f4] hover:bg-[#eff3f4]/10",
        ghost: "bg-transparent hover:bg-[#eff3f4]/10 text-[#eff3f4]",
        danger: "bg-red-600 hover:bg-red-700 text-white"
    };

    const sizes = {
        sm: "px-4 py-1.5 text-sm",
        md: "px-6 py-2 text-base",
        lg: "px-8 py-3 text-lg w-full",
        icon: "p-2 aspect-square"
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
