import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

function Header() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userInfo = useSelector(state => state.userInfo);

    const reloadThePage = () => document.location.reload();

    const logout = () => {
        // clear user info
        dispatch({ type: "clearUserInfo" });
        // redirect to home page
        navigate("/login");
    }

    return (
        // Start Header
        <header className="header-section">
            {/* Start Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                {/* Start Container */}
                <div className="container">
                    <a className="navbar-brand" href="#" onClick={reloadThePage}>مدونة الكترونية</a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link
                                    to="/"
                                    className="nav-link"
                                    aria-current="page"
                                >
                                    الصفحة الرئيسية
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav" style={{ marginRight: 'auto' }}>
                            {!userInfo && <Fragment>
                                <li className="nav-item">
                                    <Link
                                        to="/login"
                                        className="nav-link"
                                        aria-current="page"
                                    >
                                        تسجيل الدخول
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to="/sign-up"
                                        className="nav-link"
                                        aria-current="page"
                                    >
                                        إنشاء حساب جديد
                                    </Link>
                                </li>
                            </Fragment>}
                            {userInfo && <Fragment>
                                <li className="nav-item">
                                    <Link
                                        to={`/user/${userInfo._id}/blog/add-new-blog`}
                                        className="nav-link"
                                        aria-current="page"
                                    >
                                        تدوينة جديدة
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        to={`/users/profile/${userInfo._id}`}
                                        className="nav-link"
                                        aria-current="page"
                                    >
                                        الملف الشخصي
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button
                                        className="nav-link btn btn-danger text-white"
                                        aria-current="page"
                                        onClick={logout}
                                    >
                                        تسجيل الخروج
                                    </button>
                                </li>
                            </Fragment>}
                        </ul>
                    </div >
                </div >
                {/* End Container */}
            </nav >
            {/* End Navbar */}
        </header >
        //   End Header
    )
}

export default Header;