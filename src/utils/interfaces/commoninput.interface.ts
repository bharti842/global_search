export interface InputProps {
    label: string;
    value: string | number | undefined;
    onChange: (value: string) => void;
    error?: string | false | undefined;
}