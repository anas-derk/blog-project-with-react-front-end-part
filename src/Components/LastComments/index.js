import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function LastComments() {

    const [last_five_comments_list, setLastFiveCommentsList] = useState([]);

    const [last_five_comments_list_Length, setLastFiveCommentsListLength] = useState(0);

    const [is_get_last_comments_btn_clicked, setIsGetLastCommentsBtnClicked] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const { BASE_API_URL, userInfo } = useSelector(state => state);

    const getLastFiveComments = () => {
        setIsGetLastCommentsBtnClicked(true);
        if (!userInfo) {
            setErrorMessage("عذراً لا يمكن عرض آخر التعليقات لأنك لم تسجّل الدخول ، قم بتسجيل الدخول من هنا ....");
        } else {
            axios
                .get(`${BASE_API_URL}/comments/last-five-comments`)
                .then((response) => {
                    setLastFiveCommentsList(response.data);
                    setLastFiveCommentsListLength(last_five_comments_list.length);
                    if (last_five_comments_list_Length === 0) {
                        setErrorMessage("عذراً لا توجد تدوينات منشورة حالياً ...");
                    }
                })
                .catch((err) => console.log(err));
        }
    }

    const go_to_the_blog_page_which_is_related_to_the_comment = (blogId) => {
        document.location.hash = `/blog/${blogId}`;
        document.location.reload();
    }

    return (
        // Start Last Comments
        <aside className="last-comments">
            <div className="card">
                <h5 className="card-title text-center bg-secondary text-white pt-3 pb-3">
                    آخر التعليقات
                </h5>
                <p
                    className="text-center pt-3 pb-3 alert alert-info m-0"
                    style={{ cursor: 'pointer' }}
                    onClick={getLastFiveComments}
                >
                    اضغط هنا لجلب آخر التعليقات ..
                </p>
                {last_five_comments_list_Length > 0 && <ul
                    className="list-group list-group-flush"
                >
                    {last_five_comments_list.map(comment => (
                        <li
                            className="list-group-item"
                            key={comment._id}
                            style={{ cursor: 'pointer' }}
                            onClick={
                                () => go_to_the_blog_page_which_is_related_to_the_comment(comment.blogId)
                            }
                        >
                            {comment.commentContent}
                        </li>
                    ))}
                </ul>}
                {last_five_comments_list_Length === 0 && is_get_last_comments_btn_clicked &&
                    <p
                        className="text-center alert alert-danger pt-3 pb-3 m-0"
                    >
                        {errorMessage}
                    </p>
                }
                {errorMessage && !userInfo && <Link
                    to="/login"
                    className="text-center pb-3 pt-3"
                    aria-current="page"
                >
                    تسجيل الدخول
                </Link>}
            </div >
        </aside >
        // End Last Comments
    );
}

export default LastComments;