import React from "react";

/* Import functions. */
import {redirectNextPage} from "../../functions/QueryFunctions";

/* Import classes. */
import {Query} from "../../classes/Query";
import {useTranslation} from "react-i18next";

/* Pager properties. */
type PagerProps = {
    query: Query
}

/**
 * This renders the pager part.
 */
const Pager = ({query}: PagerProps) =>
{
    /* Import translation. */
    const { t } = useTranslation();

    const page = query.getApiResponseProperty().getNumberPage();
    const results = query.getApiResponseProperty().getNumberResults();
    const total = query.getApiResponseProperty().getNumberTotal();
    const filterConfig = query.getFilterConfig();

    if ((page * results) > total) {
        return <></>;
    }

    return (
        <>
            <div className="mb-3 float-end">
                <button className="link-button" onClick={(e) => {
                    redirectNextPage(
                        filterConfig,
                        page + 1
                    );
                    e.preventDefault();
                }}>{t('TEXT_ACTION_SHOW_NEXT_PAGE')}</button>
            </div>

            <div className="clearfix"></div>
        </>
    );
}

export default Pager;
