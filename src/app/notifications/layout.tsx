import Widgets from "@/components/Widgets"
import Header from "@/components/Header";

export default function NotificationsLayout({
    children, 
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Header>
                {children}
            </Header>
            <Widgets />
        </div>
    );
}
