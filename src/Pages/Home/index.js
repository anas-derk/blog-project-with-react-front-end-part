import { useEffect } from "react";

function Home({ pageTitle }) {

    useEffect(() => {

        document.title = `Blog - ${pageTitle}`;

    }, []);

    return (
        // Start Home Page
        <div className="home">
            <h1>Hello Home Page</h1>
        </div>
        // End Page Not Found
    );
}

export default Home;