import "./index.css";

function Footer() {
    return (
        // Start Footer
        <footer className="footer-section text-center pt-4 pb-3">
            {/* Start Container */}
            <div className="container">
                {/* Start Grid System */}
                <div className="row">
                    {/* Start Column */}
                    <div className="col-md">
                        <div className="personal-info p-3 bg-white details-box">
                            <h3 className="border-bottom pb-2">من أنا</h3>
                            {/* Start Info Box */}
                            <div className="info-box">
                                من أنا
                                <br />
                                من أنا
                                <br />
                                من أنا
                                <br />
                                من أنا
                            </div>
                            {/* End Info Box */}
                        </div>
                    </div>
                    {/* End Column */}
                    {/* Start Column */}
                    <div className="col-md">
                        <div className="personal-info p-3 bg-white details-box">
                            <h3 className="border-bottom pb-2">مواقع هامة</h3>
                            {/* Start Info Box */}
                            <div className="info-box">
                                من أنا
                                <br />
                                من أنا
                                <br />
                                من أنا
                                <br />
                                من أنا
                            </div>
                            {/* End Info Box */}
                        </div>
                    </div>
                    {/* End Column */}
                    {/* Start Column */}
                    <div className="col-md">
                        <div className="personal-info p-3 bg-white details-box">
                            <h3 className="border-bottom pb-2">وسائل التواصل الاجتماعي</h3>
                            {/* Start Info Box */}
                            <div className="info-box">
                                من أنا
                                <br />
                                من أنا
                                <br />
                                من أنا
                                <br />
                                من أنا
                            </div>
                            {/* End Info Box */}
                        </div>
                    </div>
                    {/* End Column */}
                </div>
                {/* End Grid System */}
                {/* Start Copyright Part */}
                <div className="copyright mt-3">
                    {/* Start Grid System */}
                    <div className="row">
                        <div className="col-md">
                            جميع الحقوق محفوظة &nbsp; &copy; &nbsp; أنس عدنان ديرك 2022
                        </div>
                    </div>
                    {/* End Grid System */}
                </div>
                {/* End Copyright Part */}
            </div>
            {/* End Container */}
        </footer>
        //   End Footer
    );
}

export default Footer;