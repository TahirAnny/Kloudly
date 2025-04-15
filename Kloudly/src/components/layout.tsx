import React, { PropsWithChildren } from "react";

const Layout = ({children} : PropsWithChildren) => {
    return (
        <div className="bg-gradient-to-b from-background to-muted">
            header
            <main className="min-h-screen container mx-auto px-4 py-8">
                {children}
            </main>
            <footer className="border-t backdrop-blur py-4">
                <p className="container mx-auto px-4 text-sm text-center text-muted-foreground">© 2023 Kloudly. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;