'use client'
import {SessionProvider} from "next-auth/react"
export default function AuthProvider({
    children,
}:{ children: React.ReactNode}) {
    return(
        <SessionProvider>
        {children}
        </SessionProvider>
    )
};

// export default function RootLayout({
//     children,
// }: Readonly<{
//     children: React.ReactNode;
// }>) {
//     return (
//         <html lang="en">
//             <AuthProvider>
//                 <body className={inter.className}>{children}</body>
//             </AuthProvider>
//         </html>
//     )
// }


