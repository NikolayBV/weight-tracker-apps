'use client';

interface Props {
    children: React.ReactNode;
}

export default function PublicLayout({ children }: Props) {

    console.log('public layout');
    return (
        <>
            {children}
        </>
    );
}