import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fox Prime Bank",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="flex flex-col w-full gap-10"
      >
        <div className="bg-brand-300 w-full h-[50vh] absolute top-0 left-0 right-0" />
        
        <main className="relative w-full flex justify-center">
          <div className="bg-neutral-0 w-3/4 flex flex-col justify-center px-9 py-10 mt-9 rounded-xl shadow-lg">
            {children}
          </div>
        </main>

          <footer className="bg-brand-300 flex justify-center items-center">
            <p className="font-body font-semibold text-base leading-8 text-brand-950 pb-5 pt-8">© Banco Fox Prime S.A -  Instituição de pagamentos 00.000/00001-00</p>
          </footer>
      </body>
    </html>
  );
}
