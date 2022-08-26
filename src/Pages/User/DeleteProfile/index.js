import Header from "../../../Components/Header/index";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function DeleteProfile({ pageTitle }) {

    const [password, setPassword] = useState("");

    const [waitMessage, setWaitMessage] = useState("");

    const [successMessage, setSuccessMessage] = useState("");

    const [wrongPasswordError, setWrongPasswordErrorMessage] = useState("");

    const { userId } = useParams();

    const { BASE_API_URL, userInfo } = useSelector(state => state);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {

        document.title = `Blog - ${pageTitle}`;

    }, []);

    const deleteProfile = (e) => {
        e.preventDefault();
        setWaitMessage("الرجاء الانتظار قليلاً ريثما يتم حذف الحساب ...");
        axios
            .delete(`${BASE_API_URL}/api/users/${userId}`, {
                data: {
                    email: userInfo.email,
                    password,
                },
            })
            .then((response) => {
                setTimeout(() => {
                    setWaitMessage("");
                    setWrongPasswordErrorMessage(response.data);
                    if (wrongPasswordError) {
                        setTimeout(() => {
                            setWrongPasswordErrorMessage("");
                            setWrongPasswordErrorMessage("");
                            setPassword("");
                        }, 2000);
                    } else {
                        setSuccessMessage(`تهانينا ${userInfo.userName} لقد تمت عملية حذف حسابك الشخصي لدى المدونة بنجاح ..`);
                        setTimeout(() => {
                            setSuccessMessage("");
                            dispatch({ type: "clearUserInfo" });
                            navigate("/");
                        }, 2000);
                    }
                }, 2000);
            })
            .catch((err) => console.log(err));
    }

    return (
        // Start Delete Profile Page
        <div className="delete-profile">
            <Header />
            <h3>حذف الحساب :</h3>
            <hr />
            <section className="delete-profile border-style p-3">
                <h4 className="mb-4">هل أنت متأكد من حذف الحساب ؟</h4>
                {/* Start Delete Profile Buttons Box */}
                <div className="delete-profile-buttons-box d-flex justify-content-between">
                    <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteAccountModal"
                    >
                        حذف الحساب
                    </button>
                    <Link
                        className="btn btn-secondary"
                        to={`/users/profile/${userId}`}
                    >
                        تراجع
                    </Link>
                </div>
                {/* End Delete Profile Buttons Box */}
            </section>
            {/* Start Include Modal From Bootstap Version 5 */}
            <div
                className="modal fade"
                id="deleteAccountModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">نافذة حذف الحساب</h5>
                        </div>
                        <div className="modal-body">
                            <h6 className="mb-3">الرجاء إدخال كلمة السر لحسابك :</h6>
                            <input
                                type="password"
                                className="form-control"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer">
                            <form
                                className="delete-profile-form d-flex justify-content-between w-100"
                                onSubmit={deleteProfile}
                            >
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    إلغاء الأمر
                                </button>
                                <button type="submit" className="btn btn-danger">حذف الآن</button>
                            </form>
                            {waitMessage && <p
                                className="alert alert-info mt-4 text-center w-100"
                            >
                                {waitMessage}
                            </p>}
                            {successMessage && <p
                                className="alert alert-success mt-4 text-center text-black w-100"
                            >
                                {successMessage}
                            </p>}
                            {wrongPasswordError && <p
                                className="alert alert-danger mt-4 text-center w-100"
                            >
                                {wrongPasswordError}
                            </p>}
                        </div>
                    </div>
                </div>
            </div>
            {/* End Include Modal From Bootstap Version 5 */}
        </div>
        //End Delete Profile Page   
    );
}

export default DeleteProfile;