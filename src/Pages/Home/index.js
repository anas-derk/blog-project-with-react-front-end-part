import "./index.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../Components/Header/index";
import { useSelector } from "react-redux";
import axios from "axios";

function Home({ pageTitle }) {

    const [successMessage, setSuccessMessage] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const [noUserLoggedError, setNotUserLoggedError] = useState("");

    const [blogsList, setBlogsList] = useState([]);

    const [blogListLength, setBlogListLength] = useState(null);

    const { BASE_API_URL, userInfo } = useSelector(state => state);

    const { successMsg } = useParams();

    useEffect(() => {

        document.title = `Blog - ${pageTitle}`;

        setSuccessMessage(successMsg);

        setTimeout(() => {
            setSuccessMessage("");
        }, 6000);
        // Get All Blogs If User Is Logged
        if (userInfo) {
            getAllBlogs();
        } else
            setNotUserLoggedError("عذراً لا يمكن عرض التدوينات لأنك لم تقم بتسجيل الدخول ، من فضلك قم بتسجيل الدخول بالضغط على الزر أدناه ...");
    }, []);

    const getAllBlogs = () => {
        axios
            .get(`${BASE_API_URL}/api/blogs/all-blogs`)
            .then((response) => {
                let tempBlogsList = response.data;
                setBlogListLength(tempBlogsList.length);
                if (blogListLength === 0) {
                    setErrorMessage("عذراً لا يوجد تدوينات حالياً ....");
                } else {
                    // Programming The Post Date Display Methology For All Blogs
                    for (let i = 0; i < blogListLength; i++) {
                        let blogPostDate = new Date(blogsList[i].blogPostDate);
                        tempBlogsList[i].blogPostDate = `${blogPostDate.toLocaleString()}`;
                    }
                    setBlogsList(tempBlogsList);
                };
            })
            .catch((err) => console.log(err));
    }

    return (
        // Start Home
        <div className="home">
            <Header />
            <h3>كل التدوينات :</h3>
            <hr />
            {successMessage && <p className="alert alert-success">
                {successMessage}
            </p>}
            {noUserLoggedError && <div>
                <p className="alert alert-danger">
                    {noUserLoggedError}
                </p>
                <Link to="/login" className="btn btn-secondary"
                >تسجيل الدخول</Link>
            </div>}
            {blogListLength === 0 && !noUserLoggedError ?
                <p
                    className="alert alert-success"
                >
                    {errorMessage}
                </p> :
                // Start All Blogs Section
                <div className="all-blogs" style={blogListLength > 2 ? { height: '479px', overflowY: 'scroll'}: {}}>
                    {/* Start Blog */}
                    {blogsList.map(blogInfo => (
                        <div
                            className="blog p-3 border-style border-radius-3 mb-5"
                            key={blogInfo._id}
                        >
                            {/* Start Author Img And Post Date Time Box */}
                            <div
                                className="author-img-and-post-date-time-box pb-3 d-flex align-items-center"
                            >
                                {/* <img src="" alt="صورة الناشر" className="rounded-circle border" /> */}
                                <i className="fas fa-user rounded-circle border"></i>
                                <span>تاريخ النشر : {blogInfo.blogPostDate}</span>
                            </div>
                            {/* Start Blog Details */}
                            <div className="blog-details">
                                <h4 className="blog-title pb-3">
                                    <Link
                                        to={`/user/${userInfo._id}/blog/${blogInfo._id}`}
                                    >{blogInfo.blogTitle}</Link>
                                </h4>
                                <p className="blog-content">
                                    محتوى التدوينة : انقر على الرابط أعلى هذا السطر تماماً .
                                </p>
                                <h6 className="text-capitalize">
                                    كاتب التدوينة : {blogInfo.blogWriterName}
                                </h6>
                            </div>
                            {/* End Blog Details */}
                        </div >
                    ))}
                    {/* End Blog */}
                    {/* End All Blogs Section */}
                </div>
            }
        </div >
        //   End Home
    );
}

export default Home;