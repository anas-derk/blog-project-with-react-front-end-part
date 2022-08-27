import "./index.css";
import Header from "../../../Components/Header";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function Profile({ pageTitle }) {

    const [userBlogsList, setUserBlogsList] = useState([]);

    const [userBlogsListLength, setUserBlogsListLength] = useState(null);

    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const { BASE_API_URL, userInfo } = useSelector(state => state);

    useEffect(() => {

        document.title = `Blog - ${pageTitle}`;

        if (!userInfo) navigate("/");

        else getBlogsByUserId();

    }, []);

    const getBlogsByUserId = (e) => {
        e.preventDefault();
        axios
            .get(
                `${BASE_API_URL}/api/blogs/user-blogs?userId=${userInfo._id}`
            )
            .then((response) => {
                let tempUserBlogsList = response.data;
                setUserBlogsListLength(tempUserBlogsList.length);
                if (userBlogsListLength === 0) {
                    setErrorMessage("عذراً لا يوجد تدوينات خاصة بك ....");
                } else setUserBlogsList(tempUserBlogsList);
            })
            .catch((err) => console.log(err));
    }

    goToBlogInfoPage = (blogId) => {
        navigate(`/user/:userId/blog/${blogId}`);
    }

    return (
        // Start Profile Page
        <div className="profile">
            <Header />
            <h3>أهلاً بك {userData.userName} في صفحة الملف الشخصي الخاصة بك :</h3>
            <hr />
            {/* Start Profile Info */}
            <div className="profile-info p-3 border-style border-radius-3">
                {/* Start Grid System */}
                <div className="row">
                    {/* Start Column */}
                    <div className="col-md-4 text-center">
                        <i className="fas fa-user rounded-circle border mx-auto"></i>
                        <Link
                            to={`/users/profile/edit-profile/${userId}`}
                            className="btn btn-danger"
                            style={{ marginLeft: '20px' }}
                        >تحرير</Link>
                        <Link
                            to={`/users/profile/delete-profile/${userId}`}
                            className="btn btn-danger"
                        >حذف</Link>
                    </div>
                    {/* End Column */}
                    {/* Start Column */}
                    <div className="col-md-8">
                        {/* Start Info Box */}
                        <div className="info-box">
                            <h4 className="mb-4">اسم المستخدم: {userData.firstName}</h4>
                            <p>الاسم : {userData.userName}</p>
                            <p>البريد الالكتروني : {userData.email}</p>
                        </div>
                        {/* Start Info Box */}
                    </div>
                    {/* End Column */}
                </div>
                {/* End Grid System */}
            </div>
            {/* End Profile Info */}
            <h3 className="mt-5">عدد التدوينات التي دونتها :</h3>
            <hr />
            {/* Start Blogs Count Box */}
            {userBlogsListLength > 0 ? <div
                className="blogs-count-box text-center fw-bold bg-secondary text-white pt-2 pb-2"
            >
                {userBlogsListLength}
            </div> : (
                <div
                    className="text-center fw-bold bg-secondary text-white pt-3 pb-3"
                    style={{ fontSize: '18px' }}
                >
                    {errorMessage}
                </div>
            )}
            {/* End Blogs Count Box */}
            <h3 className="mt-5">تدويناتي :</h3>
            <hr />
            {userBlogsListLength > 0 && (
                // Start My Blogs List
                <ul className="my-blogs-list" v-if="userBlogsListLength > 0">
                    {userBlogsList.map(blog => (
                        <li
                            className="mb-3"
                            key={blog._id}
                            onClick={() => goToBlogInfoPage(blog._id)}
                            style={{ cursor: 'pointer' }}
                        >
                            {blog.blogTitle}
                        </li>
                    ))}
                </ul>
                // End My Blogs List
            ) && <hr /> && (
                    <div className="pagination-box text-center">
                        <button className="btn btn-secondary">التالي</button>
                        <span>صفحة 1 من 10</span>
                        <button className="btn btn-secondary">السابق</button>
                    </div>
                )}
            {userBlogsListLength === 0 && <div
                className="text-center fw-bold bg-secondary text-white pt-3 pb-3"
                style={{ fontSize: '18px' }}
            >
                {errorMessage}
            </div>}
        </div>
        // End Profile Page
    );
}

export default Profile;