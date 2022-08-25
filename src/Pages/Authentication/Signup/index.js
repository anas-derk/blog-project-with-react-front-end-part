import "./index.css";
import Header from "../../../Components/Header/index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup({ pageTitle }) {

    const [userName, setUserName] = useState("");

    const [email, setEmail] = useState("");

    const [firstName, setFirstName] = useState("");

    const [middleName, setMiddleName] = useState("");

    const [password, setPassword] = useState("");

    const [confirmedPassword, setConfirmedPassword] = useState("");

    const [waitMessage, setWaitMessage] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const [isDisplayPassword, setIsDisplayPassword] = useState(false);

    const [isDisplayConfirmedPassword, setIsDisplayConfirmedPassword] = useState(false);

    const { BASE_API_URL, userInfo } = useSelector(state => state);

    const navigate = useNavigate();

    useEffect(() => {

        if (userInfo) navigate("/");

        document.title = `Blog - ${pageTitle}`;

    });

    const createNewAccount = () => {
        if (password !== confirmedPassword) {
            setErrorMessage("عذراً لا يوجد تطابق بين كلمة المرور وتأكيدها ، الرجاء مراعاة التطابق ..");
            setTimeout(() => {
                setErrorMessage("");
            }, 2000);
        } else {
            setWaitMessage("الرجاء الانتظار قليلاً ريثما يتم التحقق وإنشاء الحساب ...");
            axios
                .post(`${BASE_API_URL}/api/users/sign-up`, {
                    userName: userName,
                    email: email,
                    firstName: firstName,
                    middleName: middleName,
                    password: password,
                })
                .then((response) => {
                    setTimeout(() => {
                        setWaitMessage("");
                        setErrorMessage(response.data);
                        if (errorMessage) {
                            setTimeout(() => {
                                setErrorMessage("");
                            }, 2000);
                        }
                        // else
                        // navigate("/",
                        //     {
                        //         state:
                        //             { successMessage: `تهانينا ${userName} لقد تمت عملية التسجيل بنجاح ..` }
                        //     });
                    }, 2000);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return (
        // Start Signup
        <div className="sign-up">
            <Header />
            <h3>إنشاء حساب جديد:</h3>
            <hr />
            <form
                className="signup-form border-style p-3"
                onSubmit={createNewAccount}
            >
                <label htmlFor="#user-name">اسم المستخدم *</label>
                <input
                    type="text"
                    placeholder="من فضلك أدخل اسم المستخدم الذي تريده هنا"
                    className="form-control mt-2 mb-3"
                    id="user-name"
                    autoFocus
                    required
                    onChange={(e) => setUserName(e.target.value)}
                />
                <label htmlFor="#email">البريد الالكتروني *</label>
                <input
                    type="email"
                    placeholder="من فضلك أدخل البريد الالكتروني الذي تريده هنا"
                    className="form-control mt-2 mb-3"
                    id="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="#first-name">الاسم الأول *</label>
                <input
                    type="text"
                    placeholder="من فضلك أدخل الاسم الأول الذي تريده هنا"
                    className="form-control mt-2 mb-3"
                    id="first-name"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor="#middle-name">الاسم الثاني *</label>
                <input
                    type="text"
                    placeholder="من فضلك أدخل الاسم الثاني الذي تريده هنا"
                    className="form-control mt-2 mb-3"
                    id="middle-name"
                    required
                    onChange={(e) => setMiddleName(e.target.value)}
                />
                <label htmlFor="#password">كلمة السر *</label>
                <div className="password-field">
                    <input
                        type={isDisplayPassword ? 'text' : 'password'}
                        placeholder="من فضلك أدخل كلمة السر التي تريدها هنا"
                        className="form-control mt-2 mb-3"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <i
                        className={`fa ${isDisplayPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                        onClick={() => setIsDisplayPassword(!isDisplayPassword)}
                    ></i>
                </div>
                <label htmlFor="#confirmed-password"> تأكيد كلمة السر *</label>
                <div className="password-field">
                    <input
                        type={isDisplayConfirmedPassword ? 'text' : 'password'}
                        placeholder="من فضلك أعد إدخال كلمة السر هنا"
                        className="form-control mt-2 mb-3"
                        id="confirmed-password"
                        required
                        onChange={(e) => setConfirmedPassword(e.target.value)}
                    />
                    <i
                        className={`fa ${isDisplayConfirmedPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                        onClick={() => setIsDisplayConfirmedPassword(!isDisplayConfirmedPassword)}
                    ></i>
                </div>
                <h6 className="mt-4 mb-3 text-danger fw-bold">
                    ملاحظة : الإشارة * تعني أنّ الحقول مطلوبة .
                </h6>
                <button type="submit" className="btn btn-secondary">سجّل الآن</button>
                {waitMessage && <p className="alert alert-info mt-3 text-center">
                    {waitMessage}
                </p>}
                {errorMessage && <p
                    className="alert alert-danger mt-3 text-center text-black"
                >
                    {errorMessage}
                </p>}
                <hr />
                <p className="mb-2">
                    إذا كان لديك حساب من قبل فيمكنك تسجيل الدخول من هنا
                    <Link to="/login"> تسجيل الدخول </Link>
                </p>
            </form>
        </div>
        //   End Signup
    );
}

export default Signup;