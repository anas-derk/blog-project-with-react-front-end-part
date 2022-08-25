import {useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function LastBlogs() {

    const [last_five_blogs_list, setLastFiveBlogsList] = useState([]);

    const [last_five_blogs_list_Length, setLastFiveBlogsListLength] = useState(0);

    const [is_get_last_blogs_btn_clicked, setIsGetLastBlogsBtnClicked] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const { BASE_API_URL, userInfo } = useSelector(state => state);

    const getLastFiveBlogs = () => {
        setIsGetLastBlogsBtnClicked(true);
        if (!userInfo) {
            setErrorMessage("عذراً لا يمكن عرض آخر التدوينات لأنك لم تسجّل الدخول ، قم بتسجيل الدخول من هنا ....");
        } else {
            axios
                .get(`${BASE_API_URL}/blogs/last-five-blogs`)
                .then((response) => {
                    setLastFiveBlogsList(response.data);
                    setLastFiveBlogsListLength(last_five_blogs_list.length);
                    if (last_five_blogs_list_Length === 0) {
                        setErrorMessage("عذراً لا توجد تدوينات منشورة حالياً ...");
                    }
                })
                .catch((err) => console.log(err));
        }
    }

    const goToBlogInfoPage = (blogId) => {
        document.location.hash = `/blog/${blogId}`;
        document.location.reload();
    }

    return (
        // Start Last Blogs
        <aside className="last-blogs mb-4">
            <div className="card">
                <h5 className="card-title text-center bg-secondary text-white pt-3 pb-3">
                    آخر التدوينات
                </h5>
                <p
                    className="text-center pt-3 pb-3 alert alert-info m-0"
                    style={{ cursor: 'pointer' }}
                    onClick={getLastFiveBlogs}
                >
                    اضغط هنا لجلب آخر التدوينات ..
                </p>
                {last_five_blogs_list_Length > 0 && <ul
                    className="list-group list-group-flush"
                >
                    {last_five_blogs_list.map(blog => (
                        <li
                            className="list-group-item"
                            key={blog._id}
                            onClick={() => goToBlogInfoPage(blog._id)}
                            style={{ cursor: 'pointer' }}
                        >
                            {blog.blogTitle}
                        </li>
                    ))
                    }
                </ul>}
                {last_five_blogs_list_Length === 0 && is_get_last_blogs_btn_clicked &&
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
        // End Last Blogs
    );
}

export default LastBlogs;