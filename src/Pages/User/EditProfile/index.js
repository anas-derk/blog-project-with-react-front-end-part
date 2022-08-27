import Header from "../../../Components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function EditProfile({ pageTitle }) {

    const [userName, setUserName] = useState("");

    const [email, setEmail] = useState("");

    const [firstName, setFirstName] = useState("");

    const [middleName, setMiddleName] = useState("");

    const [password, setPassword] = useState("");

    const [waitMessage, setWaitMessage] = useState("");

    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    const { BASE_API_URL, userInfo } = useSelector(state => state);

    const dispatch = useDispatch();

    useEffect(() => {

        document.title = `Blog - ${pageTitle}`;

        if (!userInfo) {
            navigate("/login");
        } else {
            // Get User Information
            axios
                .get(`${BASE_API_URL}/api/users/user-info?userId=${userInfo._id}`)
                .then((response) => {
                    let tempUserInfo = response.data;
                    setUserName(tempUserInfo.userName);
                    setEmail(tempUserInfo.email);
                    setFirstName(tempUserInfo.firstName);
                    setMiddleName(tempUserInfo.middleName);
                    setPassword(tempUserInfo.password);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

    }, []);

    const editProfile = (e) => {
        e.preventDefault();
        setWaitMessage("الرجاء الانتظار قليلاً ريثما يتم التعديل ...");
        axios
            .put(`${BASE_API_URL}/api/users/${userInfo._id}`, {
                userName,
                email,
                firstName,
                middleName,
                password,
            })
            .then((response) => {
                setTimeout(() => {
                    dispatch("setUserInfo");
                    setWaitMessage("");
                    setSuccessMessage(`تهانينا ${userName} لقد تمت عملية تعديل بياناتك الشخصية بنجاح ..`);
                    setTimeout(() => {
                        setSuccessMessage("");
                        navigate(`/users/profile/${userInfo._id}`);
                    }, 2000);
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        // Start Edit Profile Page
        <div className="edit-profile">
            <Header />
            <h3>تعديل الملف الشخصي :</h3>
            <hr />
            <form
                className="edit-profile-form border-style p-3"
                onSubmit={editProfile}
            >
                <label htmlFor="#user-name">اسم المستخدم الجديد *</label>
                <input
                    type="text"
                    placeholder="من فضلك أدخل اسم المستخدم الجديد الذي تريده هنا"
                    className="form-control mt-2 mb-3"
                    id="user-name"
                    autoFocus
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
                <label htmlFor="#email">البريد الالكتروني الجديد *</label>
                <input
                    type="email"
                    placeholder="من فضلك أدخل البريد الالكتروني الجديد الذي تريده هنا"
                    className="form-control mt-2 mb-3"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="#first-name">الاسم الأول الجديد *</label>
                <input
                    type="text"
                    placeholder="من فضلك أدخل الاسم الأول الجديد الذي تريده هنا"
                    className="form-control mt-2 mb-3"
                    id="first-name"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <label htmlFor="#middle-name">الاسم الثاني الجديد *</label>
                <input
                    type="text"
                    placeholder="من فضلك أدخل الاسم الثاني الجديد الذي تريده هنا"
                    className="form-control mt-2 mb-3"
                    id="middle-name"
                    onChange={(e) => setMiddleName(e.target.value)}
                    required
                />
                <label htmlFor="#password">كلمة السر الجديدة *</label>
                <input
                    type="text"
                    placeholder="من فضلك أدخل كلمة السر الجديدة التي تريدها هنا"
                    className="form-control mt-2 mb-3"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <h6 className="mt-4 mb-3 text-danger fw-bold">
                    ملاحظة : الإشارة * تعني أنّ الحقول مطلوبة .
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
            </form>
        </div>
        //   End Edit Profile
    );
}

export default EditProfile;