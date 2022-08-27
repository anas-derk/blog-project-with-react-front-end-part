import Header from "../../Components/Header/index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function DeleteComment({ pageTitle }) {

    const { userId, id, commentId } = useParams();

    const [commentInfo, setCommentInfo] = useState(null);

    const [waitMessage, setWaitMessage] = useState("");

    const [successMessage, setSuccessMessage] = useState("");

    const [noCommentFoundError, setNoCommentFoundError] = useState("");

    const { BASE_API_URL, userInfo } = useSelector(state => state);

    const navigate = useNavigate();

    useEffect(() => {

        if (!userInfo) navigate("/login");

        else {

            document.title = `Blog - ${pageTitle}`;

            getCommentInfo(commentId).then((data) => {

                if (typeof data === "string") {

                    setNoCommentFoundError(data);

                } else {

                    setCommentInfo(data);

                    this.commentInfo = data;

                    if (
                        commentInfo.userId !== userId ||
                        userId !== userInfo._id ||
                        blogId !== commentInfo.blogId
                    )
                        navigate("/");
                }
            });
        }

    }, []);

    const deleteComment = (e) => {
        e.preventDefault();
        setWaitMessage("الرجاء الانتظار قليلاً ريثما يتم حذف التعليق ...");
        axios
            .delete(`${BASE_API_URL}/api/comments/${commentId}`)
            .then(() => {
                setTimeout(() => {
                    setWaitMessage("");
                    setSuccessMessage(`تهانينا ${userInfo.userName} لقد تمت عملية حذف تعليقك الشخصي على المدونة بنجاح ..`)
                    setTimeout(() => {
                        setSuccessMessage("");
                        navigate(`/user/${userId}/blog/${id}`);
                    }, 2000);
                }, 2000);
            })
            .catch((err) => console.log(err));
    }

    const getCommentInfo = (commentId) => {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `${BASE_API_URL}/api/comments/user-comment?commentId=${commentId}`
                )
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => reject(err));
        });
    }

    return (
        // Start Delete Profile Page 
        <div className="delete-profile-page">
            <Header />
            <h3>حذف التعليق :</h3>
            <hr />
            {commentInfo ? (
                <section className="delete-comment border-style p-3">
                    <h4 className="mb-4">هل أنت متأكد من حذف التعليق ؟</h4>
                    {/* Start Delete Comment Form */}
                    <form
                        className="delete-comment-form d-flex justify-content-between"
                        onSubmit={deleteComment}
                    >
                        <button type="submit" className="btn btn-danger">حذف التعليق</button>
                        <Link
                            to={`/user/${userId}/blog/${id}`}
                            className="btn btn-secondary"
                        >
                            تراجع
                        </Link>
                    </form>
                    {/* End Delete Comment Form */}
                    {waitMessage && <p className="alert alert-info mt-4 text-center">
                        {waitMessage}
                    </p>}
                    {successMessage && <p
                        className="alert alert-success mt-4 text-center text-black"
                    >
                        {successMessage}
                    </p>}
                </section>
            ) : (
                <p className="alert alert-danger mt-3 text-center">
                    {noCommentFoundError}
                </p>
            )}
        </div>
        //   End Delete Comment Page
    );

}

export default DeleteComment;