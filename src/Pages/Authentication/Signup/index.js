import { useEffect } from "react";

function Signup({ pageTitle }) {

    useEffect(() => {

        document.title = `Blog - ${pageTitle}`;

    });

    return (
        <h1>Hello Add</h1>
    )
}

export default Signup;