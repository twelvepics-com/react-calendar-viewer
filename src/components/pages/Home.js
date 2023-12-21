/* Add component parts */
import Header from "../layout/Header";
import Loader from "../layout/Loader";

/**
 * This is the app home page.
 */
const Home = () => {
    return (
        <>
            <Header title='Home' subtitle='Home Test page' />
            <div className="home container mb-5">
                <div className="row g-3">
                    {/* One column */}
                    <div className="col-12">
                        <div className="calendars-card p-3 border bg-light">
                            Test
                        </div>
                    </div>

                    {/* Two columns */}
                    <div className="col-12 col-lg-6 col-xl-6">
                        <div className="calendars-card p-3 border bg-light">
                            Test
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-6">
                        <div className="calendars-card p-3 border bg-light">
                            Test
                        </div>
                    </div>

                    {/* Three columns */}
                    <div className="col-12 col-lg-6 col-xl-4">
                        <div className="calendars-card p-3 border bg-light">
                            Test
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-4">
                        <div className="calendars-card p-3 border bg-light">
                            Test
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 col-xl-4">
                        <div className="calendars-card p-3 border bg-light">
                            Test
                        </div>
                    </div>

                    <Loader />
                </div>
            </div>
        </>
    );
}

export default Home;
