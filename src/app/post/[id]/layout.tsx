import Widgets from "@/components/Widgets"
import Header from "@/components/Header";

export default function HomeLayout({
    children, 
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header>
                {children}
            </Header>
            <Widgets />
        </>
    );
}
