import "./index.css";
import Header from "../../../Components/Header/index";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ pageTitle }) {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [waitMessage, setWaitMessage] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const [isDisplayPassword, setIsDisplayPassword] = useState(false);

    const { BASE_API_URL, userInfo } = useSelector(state => state);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        
        if (userInfo) navigate("/");

        document.title = `Blog - ${pageTitle}`;

    });

    const login = (e) => {
        e.preventDefault();
        setWaitMessage("الرجاء الانتظار قليلاً ريثما يتم التحقق وتسجيل الدخول ...");
        axios
            .get(
                `${BASE_API_URL}/api/users/login?email=${email}&password=${password}`
            )
            .then((response) => {
                setTimeout(() => {
                    setWaitMessage("");
                    let result = response.data;
                    if (typeof result == "string") {
                        setErrorMessage(result);
                        setTimeout(() => {
                            setErrorMessage("");
                        }, 4000);
                    } else {
                        localStorage.setItem("user-info", result);
                        dispatch({ type: "setUserInfo" });
                        navigate("/");
                    }
                }, 2000);
            })
            .catch((err) => console.log(err));
    }

    return (
        // Start Login
        <div className="login">
            <Header />
            <h3>تسجيل الدخول:</h3>
            <hr />
            <form className="login-form border-style p-3" onSubmit={login}>
                <label htmlFor="#email">البريد الالكتروني *</label>
                <input
                    type="email"
                    placeholder="من فضلك أدخل البريد الالكتروني لحسابك هنا"
                    className="form-control mt-2 mb-3"
                    id="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="#password">كلمة السر *</label>
                <div className="password-field">
                    <input
                        type={isDisplayPassword ? 'text' : 'password'}
                        placeholder="من فضلك أدخل كلمة سر حسابك هنا"
                        className="form-control mt-2 mb-3"
                        id="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <i
                        className={!isDisplayPassword ? 'fa-eye' : 'fa-eye-slash'}
                        onClick={() => setIsDisplayPassword(!isDisplayPassword)}
                    ></i>
                </div>
                <h6 className="mt-4 mb-3 text-danger fw-bold">
                    ملاحظة : الإشارة * تعني أنّ الحقول مطلوبة .
                </h6>
                <button type="submit" className="btn btn-secondary">تسجيل الدخول الآن</button>
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
                    إذا لم يكن لديك حساب من قبل فيمكنك إنشاء حساب جديد من هنا
                    <Link to="/sign-up"> إنشاء حساب جديد </Link>
                </p>
            </form>
        </div>
        //   End Login
    )
}

export default Login;