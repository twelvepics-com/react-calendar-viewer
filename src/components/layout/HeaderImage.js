/**
 * This is the header image part.
 */
const HeaderImage = ({data}) => {
    let pageTitle = data.page_title;
    let title = data.title;
    let color = data.color;

    if (title === undefined) {
        return (<></>);
    }

    return (
        <header className="masthead image" style={{
            backgroundColor: color
        }}>
            <div className="container position-relative px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <div className="site-heading">
                            <h1>{title}</h1>
                            <span className="subheading">{pageTitle}</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default HeaderImage;