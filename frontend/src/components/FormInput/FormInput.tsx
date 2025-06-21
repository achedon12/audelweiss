import React, {useState} from "react";
import {Eye, EyeSlash} from "phosphor-react";

type FormInputProps = {
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    name?: string;
    placeholder?: string;
    autoComplete?: string;
    className?: string;
};

const FormInput = ({
                       label,
                       type = "text",
                       value,
                       onChange,
                       required = false,
                       name,
                       placeholder,
                       autoComplete,
                       className = "",
                   }: FormInputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;
    const showError = required && touched && value.trim() === "";

    return (
        <div className={`mb-6 ${className}`}>
            <label className={`block mb-2 text-sm text-awblack ${required ? "required" : ""}`}>{label}</label>
            <div className={isPassword ? "flex w-full p-2 border border-awsalmon text-awblack" : ""}>
                <input
                    type={inputType}
                    className={isPassword ? "w-full bg-transparent outline-none" : "w-full p-2 border border-awsalmon text-awblack"}
                    value={value}
                    onChange={onChange}
                    onBlur={() => setTouched(true)}
                    required={required}
                    name={name}
                    placeholder={placeholder}
                    autoComplete={autoComplete || name}
                />
                {isPassword && (
                    <span
                        className="flex items-center cursor-pointer ml-2"
                        onClick={() => setShowPassword((v) => !v)}
                        tabIndex={0}
                        role="button"
                        aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                    >
                        {showPassword ? <Eye size={24}/> : <EyeSlash size={24}/>}
                    </span>
                )}
            </div>
            {showError && (
                <p className="text-red-500 text-xs mt-1">Ce champ est requis.</p>
            )}
        </div>
    );
};

export default FormInput;