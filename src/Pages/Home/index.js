import { useEffect } from "react";
import Header from "../../Components/Header/index";

function Home({ pageTitle }) {

    useEffect(() => {

        document.title = `Blog - ${pageTitle}`;

    }, []);

    return (
        // Start Home Page
        <div className="home">
            <Header />
        </div>
        // End Page Not Found
    );
}

export default Home;