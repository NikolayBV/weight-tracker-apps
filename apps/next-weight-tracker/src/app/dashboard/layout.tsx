'use client';


interface Props {
    children: React.ReactNode;
}

export default function ProtectedLayout({ children }: Props) {

    return (
        <>
            {children}
        </>
    );
}