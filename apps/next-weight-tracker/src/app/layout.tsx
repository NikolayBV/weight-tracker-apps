import "./globals.css";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/charts/styles.css';
import {MantineProvider} from "@mantine/core";
import {Notifications} from "@mantine/notifications";
import Header from "@/components/ui/header/Header";
import Footer from "@/components/ui/footer/Footer";
import MainLayout from "@/components/layouts/main-layout/MainLayout";
import Providers from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body>
    <Providers>
    <MantineProvider
        defaultColorScheme="auto"
        theme={{
      fontFamily: 'Inter, sans-serif',
      primaryColor: 'blue',
      defaultRadius: 'md',
    }}>
      <Notifications />
      <Header title={"Weight tracker"} />

      <MainLayout>
        {children}
      </MainLayout>

      <Footer />
    </MantineProvider>
    </Providers>
    </body>
    </html>
  );
}
