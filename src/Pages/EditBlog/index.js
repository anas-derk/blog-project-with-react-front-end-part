import "./index.css";
import Header from "../../Components/Header/index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditBlog({ pageTitle }) {

    const { userId, id } = useParams();

    const [blogInfo, setBlogInfo] = useState(null);

    const [blogTitle, setBlogTitle] = useState("");

    const [blogContent, setBlogContent] = useState("");

    const [waitMessage, setWaitMessage] = useState("");

    const [successMessage, setSuccessMessage] = useState("");

    const [noBlogFoundError, setNoBlogFoundError] = useState("");

    const { BASE_API_URL, userInfo } = useSelector(state => state);

    const navigate = useNavigate();

    useEffect(() => {
        
        if (!userInfo) navigate("/login");
        
        else {

            document.title = `Blog - ${pageTitle}`;
            
            // Get Previos Blog Info

            getBlogInfo(blogId).then((data) => {

                // Check if Blog Is Exists

                if (typeof data === "string") {

                    setNoBlogFoundError(data);

                } else {

                    // Store Reponsed Data In Blog Info Object

                    setBlogInfo(data);

                    /* Start Check if This User Write This Blog */
                    if (
                        blogInfo.userId !== userId ||
                        userId !== userInfo._id
                    )
                        // Auto Redirect To Home Page because This User Don't Write This Blog

                        navigate("/");

                    else {

                        setBlogTitle(blogInfo.blogTitle);

                        setBlogContent(blogInfo.blogContent);

                    }

                    /* End Check if This User Write This Blog */

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
    const editBlog = (e) => {

        e.preventDefault();

        setWaitMessage("الرجاء الانتظار قليلاً ريثما يتم التعديل ...");

        axios
            .put(`${BASE_API_URL}/api/blogs/${blogId}`, {
                blogTitle,
                blogContent,
            })
            .then(() => {

                setTimeout(() => {

                    setWaitMessage("");

                    setSuccessMessage(`تهانينا ${userInfo.userName} لقد تمت عملية تعديل بيانات مدونتك الشخصية بنجاح ..`);
                    
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
        // Start Edit Blog Page
        <div className="edit-blog">
            <Header />
            <h3>تعديل التدوينة :</h3>
            <hr />
            {/* Start Edit Blog Form Section */}
            {blogInfo ? (
                <form
                    className="edit-blog-form border-style p-3"
                    onSubmit={editBlog}
                >
                    <label htmlFor="#blog-title">عنوان التدوينة الجديد *</label>
                    <input
                        type="text"
                        placeholder="من فضلك أدخل عنوان التدوينة الجديد هنا"
                        className="form-control mt-2 mb-3"
                        id="blog-title"
                        autoFocus
                        onChange={(e) => setBlogTitle(e.target.value)}
                        required
                    />
                    <label htmlFor="#new-blog-content">نص التدوينة الجديد *</label>
                    <textarea
                        placeholder="من فضلك اكتب نص التدوينة الجديد هنا"
                        className="form-control mt-2 mb-3"
                        id="new-blog-content"
                        onChange={(e) => setBlogContent(e.target.value)}
                        required
                    ></textarea>
                    <h6 className="mt-4 mb-3 text-danger fw-bold">
                        ملاحظة : الإشارة * تعني أنّ الحقول مطلوبة .
                    </h6>
                    <button type="submit" className="btn btn-secondary">تعديل التدوينة</button>
                    {waitMessage && <p className="alert alert-info mt-3 text-center">
                        {waitMessage}
                    </p>}
                    {successMessage && <p className="alert alert-success mt-3 text-center">
                        {successMessage}
                    </p>}
                </form>
                // End Edit Blog Form Section
            ) : (
                <p className="alert alert-danger mt-3 text-center">
                    {noBlogFoundError}
                </p>
            )}
        </div>
        //   End Edit Blog Page
    );
}

export default EditBlog;