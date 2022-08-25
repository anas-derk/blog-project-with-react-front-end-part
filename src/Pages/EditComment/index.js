import { useEffect } from "react";

function EditComment({ pageTitle }) {

    useEffect(() => {

        document.title = `Blog - ${pageTitle}`;

    });

    return (
        <h1>Hello Add</h1>
    )
}

export default EditComment;