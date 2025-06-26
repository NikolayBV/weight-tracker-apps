import "./globals.css";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/charts/styles.css';
import {MantineProvider} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import Header from "@/components/ui/header/Header";
import Footer from "@/components/ui/footer/Footer";
import MainLayout from "@/components/layouts/main-layout/MainLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
    <MantineProvider
        defaultColorScheme="auto"
        theme={{
      fontFamily: 'Inter, sans-serif',
      primaryColor: 'blue',
      defaultRadius: 'md',
    }}>
      <Notifications />
      <Header title={"Weight tracker"} />

      <main>
        {children}
      </main>

      <Footer />
    </MantineProvider>
    </body>
    </html>
  );
}
