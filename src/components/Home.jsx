import React from 'react'
import Navbar from './Navbar'
import CourseCatalog from './CourseCatalog'
import CourseBanner from './CourseBanner'
import Partners from './Partners'
import Footer from './Footer'
function Home() {
    return (
        <>

            <Navbar />
            <div className="container mx-auto px-4">
                <CourseBanner />
                <CourseCatalog />
                <Partners />
                <Footer />
            </div>
        </>
    )
}

export default Home