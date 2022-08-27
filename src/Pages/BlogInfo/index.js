import "./index.css";
import Header from "../../Components/Header";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function BlogInfo({ pageTitle }) {

    const { id } = useParams();

    const [email, setEmail] = useState("");

    const [comment, setComment] = useState("");

    const [blogInfo, setBlogInfo] = useState(null);

    const [waitMessage, setWaitMessage] = useState("");

    const [successMessage, setSuccessMessage] = useState("");

    const [noCommentsFoundError, setNoCommentsFoundError] = useState("");

    const [commentList, setCommentList] = useState([]);

    const [commentListLength, setCommentListLength] = useState(null);

    const [noBlogFoundError, setNoBlogFoundError] = useState("");

    const { BASE_API_URL, userInfo } = useSelector(state => state);

    const navigate = useNavigate();

    useEffect(() => {

        document.title = `Blog - ${pageTitle}`;

        // Check if User Logged ( Protect Blog Info Route )

        if (userInfo) {

            // Call Get Comment By Id Info Function

            getBlogInfo(id).then(() => {

                if (blogInfo) {

                    // Call Get Blog Info Function

                    getCommentsByBlogId(id);

                }
            });
        }

        else

            // Redirect To Login Page Because User Is Not Logged

            navigate("/login");

    }, []);

    const getBlogInfo = (blogId) => {

        return new Promise((resolve, reject) => {

            axios
                .get(`${BASE_API_URL}/api/blogs?blogId=${blogId}`)
                .then((response) => {

                    let data = response.data;

                    if (typeof data === "string") {

                        setNoBlogFoundError(data);

                    } else {

                        setBlogInfo(data);

                        // Programming The Post Date Display Methology For Blog

                        let blogPostDate = new Date(blogInfo.blogPostDate);

                        blogInfo.blogPostDate = `${blogPostDate.toLocaleString()}`;

                    }

                    resolve();

                })
                .catch((err) => reject(err));
        });
    }

    const addNewComment = () => {

        setWaitMessage("الرجاء الانتظار ريثما يتم نشر التعليق ....");

        axios
            .post(`${BASE_API_URL}/api/comments`, {
                userName: userInfo.userName,
                email,
                commentContent: comment,
                blogId: id,
                userId: userInfo._id,
            })
            .then((response) => {

                setTimeout(() => {

                    setWaitMessage("");

                    if (response.data) {

                        setNoBlogFoundError(response.data);

                        setTimeout(() => {

                            setNoBlogFoundError("");

                            document.location.reload();

                        }, 2000);

                    } else {

                        setSuccessMessage(`تهانينا ${userInfo.userName} لقد تمّ نشر تعليقك بنجاح ....`);

                        setTimeout(() => {

                            setSuccessMessage("");

                            document.location.reload();

                        }, 2000);

                    }
                }, 2000);
            })
            .catch((err) => console.log(err));
    }

    const getCommentsByBlogId = () => {

        axios
            .get(`${BASE_API_URL}/api/comments?blogId=${id}`)
            .then((response) => {

                let tempCommentList = response.data;

                setCommentList();

                setCommentListLength(commentList.length);

                if (commentListLength == 0) {

                    setNoCommentsFoundError("عذراً لا توجد تعليقات على هذه التدوينة لحد الآن ...");

                } else {

                    // Programming The Post Date Display Methology For All Comments On Blogs

                    for (let i = 0; i < commentListLength; i++) {

                        let commentPostDate = new Date(commentList[i].commentPostDate);

                        tempCommentList[i].commentPostDate = `${commentPostDate.toLocaleString()}`;

                    }

                    setCommentList(tempCommentList);

                }

            })
            .catch((err) => console.log(err));
    }

    return (
        // Start Blog Details Page
        <div className="blog-details">
            <Header />
            <h3>معلومات التدوينة :</h3>
            <hr />
            {/* Start Blog */}
            {blogInfo && userInfo ? <div
                className="blog p-3 border-style border-radius-3"
            >
                {/* Start Author Img And Post Date Time Box */}
                <div
                    className="author-img-and-post-date-time-box pb-3 d-flex align-items-center"
                >
                    {/* <img src="" alt="صورة الناشر" className="rounded-circle border" /> */}
                    <i className="fas fa-user rounded-circle border"></i>
                    <span
                    >تاريخ النشر : <br />
                        {blogInfo.blogPostDate}</span
                    >
                </div>
                {/* Start Deal Buttons With Blog Box */}
                {userInfo._id === blogInfo.userId && <div
                    className="deal-button-with-blog-box"
                >
                    <Link
                        to={`/user/${userId}/blog/${id}/edit`}
                        className="btn btn-secondary go-to-blog-edit-page-btn"
                    >
                        تحرير
                    </Link>
                    <Link
                        to={`/user/${userId}/blog/${id}/delete`}
                        className="btn btn-danger"
                    >
                        حذف
                    </Link>
                </div>}
                {/* End Deal Buttons With Blog Box */}
                {/* Start Blog Info */}
                <div className="blog-info">
                    <h4 className="blog-title">{blogInfo.blogTitle}</h4>
                    <p className="blog-content">{blogInfo.blogContent}</p>
                    <h6 className="text-capitalize">
                        اسم الكاتب : {blogInfo.blogWriterName}
                    </h6>
                </div>
                {/* End Blog Info */}
            </div> : <p className="alert alert-danger mt-3 text-center">
                {noBlogFoundError}
            </p>}
            {/* End Blog */}
            {/* Start Comments Section */}
            {blogInfo && <section className="comments mt-4">
                <h3>التعليقات على التدوينة :</h3>
                <hr />
                {noCommentsFoundError ? (
                    <p
                        className="alert alert-danger mt-3 text-center"
                    >
                        {noCommentsFoundError}
                    </p>
                ) : (
                    // Start Comment Details Box
                    commentList.map(commentInfo => (

                        <div
                            className="comment-details p-3 mb-5"
                            v-for="commentInfo in commentList"
                            key={commentInfo._id}
                        >
                            <h6 className="pb-3 fw-bold">
                                <span>كتب ( {commentInfo.userName} ) هذا التعليق في تاريخ</span>
                                <time>&nbsp; {commentInfo.commentPostDate}</time>
                            </h6>
                            <p className="['comment-content mt-3', {'mb-1': commentInfo.email !== email}]">
                                {commentInfo.commentContent}
                            </p>
                            {/* Start Comment Option Box */}
                            <div className="comment-options-box" v-if="commentInfo.email === email">
                                <i
                                    className="fas fa-edit bg-danger text-center text-white"
                                    onClick={() => goToCommentEditPage(commentInfo._id)}
                                ></i>
                                <i
                                    className="fas fa-trash-alt bg-danger text-center text-white"
                                    onClick={() => goToDeleteCommentPage(commentInfo._id)}
                                ></i>
                            </div>
                            {/* Start Comment Options Box */}
                        </div>
                    ))
                    // End Comment Details Box
                )}
                {/* End Comments Section */}
            </section> && (
                    // Start Add New Comment Form Section
                    <section className="add-new-comment mt-4">
                        <h3>إضافة تعليق جديد :</h3>
                        <hr />
                        <form
                            className="add-new-comment-form border-style p-3"
                            onSubmit={addNewComment}
                        >
                            <label htmlFor="#user-name">الاسم *</label>
                            <input
                                type="text"
                                placeholder="من فضلك أدخل اسمك هنا"
                                className="form-control mt-2 mb-3"
                                id="user-name"
                                autofocus
                                onChange={(e) => setUserName(e.target.value)}
                                disabled
                            />
                            <label htmlFor="#email">البريد الالكتروني *</label>
                            <input
                                type="email"
                                placeholder="من فضلك أدخل البريد الالكتروني هنا"
                                className="form-control mt-2 mb-3"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                disabled
                            />
                            <label for="#comment">التعليق *</label>
                            <textarea
                                placeholder="من فضلك اكتب التعليق هنا"
                                className="form-control mt-2 mb-3"
                                id="comment"
                                onChange={(e) => setComment(e.target.value)}
                                required
                                style={{ resize: 'none', height: '200px' }}
                            ></textarea>
                            <h6 className="mt-4 mb-3 text-danger fw-bold">
                                ملاحظة : الإشارة * تعني أنّ الحقول مطلوبة .
                            </h6>
                            <button type="submit" className="btn btn-secondary">نشر التعليق</button>
                            {waitMessage && <p className="alert alert-info mt-3 text-center">
                                {waitMessage}
                            </p>}
                            {successMessage && <p className="alert alert-info mt-3 text-center" >
                                {successMessage}
                            </p>}
                            {noBlogFoundError && <p className="alert alert-danger mt-3 text-center">
                                {noBlogFoundError}
                            </p>}
                        </form>
                    </section>
                    // End Add New Comment Form Section
                )}
        </div>
        //   End Blog Details Page
    );
}

export default BlogInfo;