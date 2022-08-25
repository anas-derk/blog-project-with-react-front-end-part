import { useEffect } from "react";

function EditBlog({ pageTitle }) {

    useEffect(() => {

        document.title = `Blog - ${pageTitle}`;

    });

    return (
        <h1>Hello Add</h1>
    )
}

export default EditBlog;