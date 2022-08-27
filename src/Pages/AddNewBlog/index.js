import "./index.css";
import Header from "../../Components/Header/index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddNewBlog({ pageTitle }) {

    const [blogTitle, setBlogTitle] = useState("");

    const [blogContent, setBlogContent] = useState("");

    const [waitMessage, setWaitMessage] = useState("");

    const [successMessage, setSuccessMessage] = useState("");

    const { BASE_API_URL, userInfo } = useSelector(state => state);

    const navigate = useNavigate();

    useEffect(() => {

        
        // Check if User Logged ( Protect Add New Blog Route )
        if (!userInfo) {
            
            // Redirect To Login Page Because User Is Not Logged
            
            navigate("/login");
            
        } else document.title = `Blog - ${pageTitle}`;
        
    }, []);

    const addNewBlog = (e) => {
        e.preventDefault();
        axios
            .post(`${BASE_API_URL}/api/blogs`, {
                userId: userInfo._id,
                blogTitle,
                blogContent,
                blogWriterName: userInfo.userName,
            })
            .then(() => {
                setWaitMessage("الرجاء الانتظار ريثما يتم إنشاء المدونة الخاصة بك ....");
                setTimeout(() => {
                    setWaitMessage("");
                    setSuccessMessage(`تهانينا ${userInfo.firstName} لقد تمت عملية إضافة مدونتك بنجاح ...`)
                    setTimeout(() => {
                        navigate("/");
                    }, 2000);
                }, 2000);
            })
            .catch((err) => console.log(err));
    }

    return (
        // Start Add New Blog Page
        <div className="add-new-blog">
            <Header />
            <h3>إضافة تدوينة جديدة :</h3>
            <hr />
            <form
                className="add-new-blog-form border-style p-3"
                onSubmit={addNewBlog}
            >
                <label htmlFor="#blog-title">عنوان التدوينة *</label>
                <input
                    type="text"
                    placeholder="من فضلك أدخل عنوان التدوينة هنا"
                    className="form-control mt-2 mb-3"
                    id="blog-title"
                    autoFocus
                    onChange={(e) => setBlogTitle(e.target.value)}
                    required
                />
                <label htmlFor="#comment">نص التدوينة *</label>
                <textarea
                    placeholder="من فضلك اكتب نص التدوينة هنا"
                    className="form-control mt-2 mb-3"
                    id="blog-content"
                    onChange={(e) => setBlogContent(e.target.value)}
                    required
                ></textarea>
                <h6 className="mt-4 mb-3 text-danger fw-bold">
                    ملاحظة : الإشارة * تعني أنّ الحقول مطلوبة .
                </h6>
                <button type="submit" className="btn btn-secondary">نشر التدوينة</button>
                {waitMessage && <p className="alert alert-info mt-3 text-center">
                    {waitMessage}
                </p>}
                {successMessage && <p
                    className="alert alert-success mt-3 text-center text-black"
                >
                    {successMessage}
                </p>}
            </form>
            {/* End Add New Comment Form Section */}
        </div>
        //   End Add New Blog Page
    );
}

export default AddNewBlog;