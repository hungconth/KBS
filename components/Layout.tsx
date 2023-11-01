
import Header from "@/components/Header";
import React, { Children, ReactNode } from 'react';
import Footer from "./Footer";
interface Props {
    children?: ReactNode
    // any props that come into the component
  }
export default function Layout({ children }: Props){



    return(
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}