import Header from "../../Components/Header/index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditComment({ pageTitle }) {

    const { userId, id, commentId } = useParams();

    const [commentInfo, setCommentInfo] = useState(null);

    const [commentContent, setCommentContent] = useState("");

    const [waitMessage, setWaitMessage] = useState("");

    const [successMessage, setSuccessMessage] = useState("");

    const [noCommentFoundError, setNoCommentFoundError] = useState("")

    const { BASE_API_URL, userInfo } = useSelector(state => state);

    const navigate = useNavigate();

    useEffect(() => {

        if (!userInfo) navigate("/login");

        else {

            document.title = `Blog - ${pageTitle}`;

            // Get Previos Comment Info

            getCommentInfo(commentId).then((data) => {

                // Check if Comment Is Exists

                if (typeof data === "string") {

                    setNoCommentFoundError(data);

                } else {

                    // Store Reponsed Data In Comment Info Object

                    setBlogInfo(data);

                    /* Start Check if This User Write This Blog */
                    if (
                        commentInfo.userId !== userId ||
                        userId !== userInfo._id ||
                        blogId !== commentInfo.blogId
                    )
                        // Auto Redirect To Home Page because This User Don't Write This Blog

                        navigate("/");

                    else {

                        setCommentContent(bcommentInfo.commentContent);

                    }

                    /* End Check if This User Write This Comment */

                }

            });

        }

    });

    const getCommentInfo = (commentId) => {

        return new Promise((resolve, reject) => {

            axios
                .get(`${BASE_API_URL}/api/comments/user-comment?commentId=${commentId}`)
                .then((response) => {

                    resolve(response.data);

                })
                .catch((err) => reject(err));
        });
    }
    const editComment = (e) => {

        e.preventDefault();

        setWaitMessage("الرجاء الانتظار قليلاً ريثما يتم التعديل ...");

        axios
            .put(`${BASE_API_URL}/api/comments/${commentId}`, { commentContent })
            .then(() => {

                setTimeout(() => {

                    setWaitMessage("");

                    setSuccessMessage(`تهانينا ${userInfo.userName} لقد تمت عملية تعديل تعليقك الشخصي بنجاح ..`);

                    setTimeout(() => {

                        setSuccessMessage("");

                        navigate(`/user/${userId}/blog/${id}`);

                    }, 2000);

                }, 2000);

            })
            .catch((err) => {

                console.log(err);

            });
    }

    return (
        // Start Edit Comment Page
        <div className="edit-comment">
            <Header />
            <h3>أهلاً بك في صفحة تعديل التعليق الخاص بك :</h3>
            <hr />
            {commentInfo ? (<form
                className="edit-comment-form border-style p-3"
                onSubmit={editComment}
            >
                <label htmlFor="#comment-content">التعليق الجديد :</label>
                <input
                    type="text"
                    placeholder="من فضلك أدخل التعليق الجديد الذي تريده هنا"
                    className="form-control mt-2 mb-3"
                    id="comment-content"
                    autofocus
                    onChange={(e) => setCommentContent(e.target.value)}
                    required
                />
                <h6 className="mt-4 mb-3 text-danger fw-bold">
                    ملاحظة : الإشارة * تعني أنّ الحقل مطلوب .
                </h6>
                <button type="submit" className="btn btn-secondary">تعديل الآن</button>
                {waitMessage && <p className="alert alert-info mt-3 text-center">
                    {waitMessage}
                </p>}
                {successMessage && <p
                    className="alert alert-success mt-3 text-center text-black"
                >
                    {successMessage}
                </p>}
            </form>) : (
                <p className="alert alert-danger mt-3 text-center">
                    {noCommentFoundError}
                </p>
            )}
        </div>
        // End Edit Comment Page
    );
}

export default EditComment;