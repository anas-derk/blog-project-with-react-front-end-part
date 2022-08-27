import Header from "../../Components/Header/index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function DeleteBlog({ pageTitle }) {

    const { userId, blogId, } = useParams();

    const [blogInfo, setBlogInfo] = useState(null);

    const [waitMessage, setWaitMessage] = useState("");

    const [successMessage, setSuccessMessage] = useState("");

    const [noBlogFoundError, setNoBlogFoundError] = useState("");

    const { BASE_API_URL, userInfo } = useSelector(state => state);

    const navigate = useNavigate();

    useEffect(() => {

        if (!userInfo) navigate("/login");

        else {

            document.title = `Blog - ${pageTitle}`;

            getBlogInfo(blogId).then((data) => {

                if (typeof data === "string") {

                    setNoBlogFoundError(data);

                } else {

                    setBlogInfo(data);

                    if (
                        blogInfo.userId !== userId ||
                        userId !== userInfo._id
                    )
                        navigate("/");
                }
            });
        }

    }, []);

    const getBlogInfo = (blogId) => {
        return new Promise((resolve, reject) => {
            axios
                .get(`${BASE_API_URL}/api/blogs?blogId=${blogId}`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => reject(err));
        });
    }

    const deleteBlog = (e) => {
        e.preventDefault();
        setWaitMessage("الرجاء الانتظار قليلاً ريثما يتم تنفيذ المهمة ...");
        axios
            .delete(`${BASE_API_URL}/api/blogs/${id}`)
            .then(() => {
                setTimeout(() => {
                    setWaitMessage("");
                    setSuccessMessage(`تهانينا ${userInfo.userName} لقد تمت عملية حذف مدونتك الشخصية بنجاح ..`);
                    setTimeout(() => {
                        setSuccessMessage("");
                        navigate("/");
                    }, 2000);
                }, 2000);
            })
            .catch((err) => console.log(err));
    }

    return (
        // Start Delete Blog Page
        <div className="delete-blog">
            <Header />
            <h3>حذف التدوينة :</h3>
            <hr />
            {blogInfo ? (<section className="delete-blog border-style p-3">
                <h4 className="mb-4">هل أنت متأكد من حذف التدوينة ؟</h4>
                {/* Start Delete Blog Form */}
                <form
                    className="delete-blog-form d-flex justify-content-between"
                    onSubmit={deleteBlog}
                >
                    <button type="submit" className="btn btn-danger">حذف التدوينة</button>
                    <Link
                        to={`/user/${userId}/blog/${id}`}
                        className="btn btn-secondary"
                    >
                        تراجع
                    </Link>
                </form>
                {/* End Delete Blog Form */}
                {waitMessage && <p className="alert alert-info mt-4 text-center">
                    {waitMessage}
                </p>}
                {successMessage && <p
                    className="alert alert-success mt-4 text-center text-black"
                >
                    {successMessage}
                </p>}
            </section>) : (
                <p className="alert alert-danger mt-3 text-center">
                    {noBlogFoundError}
                </p>
            )}
        </div>
        //   End Delete Blog Page
    );
}

export default DeleteBlog;