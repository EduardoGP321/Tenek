import type { ElementType, ComponentPropsWithoutRef } from "react";

interface ContainerProps<T extends ElementType = "div"> {
    as?: T;
    className?: string;
    children: React.ReactNode;
}

export default function Container<T extends ElementType = "div">({
    as,
    className = "",
    children,
    ...props
}: ContainerProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ContainerProps<T>>) {
    const Component = as || "div";

    return (
        <Component
            className={`mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 [padding-left:max(1rem,env(safe-area-inset-left))] [padding-right:max(1rem,env(safe-area-inset-right))] ${className}`}
            {...props}
        >
            {children}
        </Component>
    );
}