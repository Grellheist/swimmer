// import Sidebar from "../../components/Sidebar"
import Widgets from "@/components/Widgets"
import Header from "@/components/Header";

export default function DashboardLayout({
    children, // will be a page or nested layout
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
