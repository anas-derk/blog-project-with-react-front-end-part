import { useEffect } from "react";

function AddNewBlog({ pageTitle }) {

    useEffect(() => {

        document.title = `Blog - ${pageTitle}`;

    });

    return (
        <h1>Hello Add</h1>
    )
}

export default AddNewBlog;