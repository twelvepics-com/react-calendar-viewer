import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";

/* Import functions */
import {convertToGermanFormatFromDate} from "../../functions/Date";

/* Import types */
import {TypeBirthdays} from "../../types/Types";
import {Button, Modal} from "react-bootstrap";

type HolidaysProps = {
    data: TypeBirthdays|undefined
}

/**
 * Checks the holidays today.
 */
const getTodaysBirthdayNames = (birthdays: TypeBirthdays): string[] =>
{
    const today = new Date().toISOString().slice(0, 10);

    if (!birthdays || !(today in birthdays)) {
        return [];
    }

    return birthdays[today].map(birthday => birthday.name.replace(/ \(\d+\)$/, ''));
};

/**
 * This is the birthday part.
 */
const Birthdays = ({data}: HolidaysProps) =>
{
    /* Import translation. */
    const { t } = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [todaysBirthdays, setTodaysBirthdays] = useState<string[]>([]);

    useEffect(() => {
        if (data === undefined) {
            return;
        }

        const birthdayNames = getTodaysBirthdayNames(data);

        if (birthdayNames.length > 0) {
            setTodaysBirthdays(birthdayNames);
            setIsModalOpen(true);
        }
    }, [data]);

    if (data === undefined || Object.keys(data).length <= 0) {
        return <></>
    }

    const handleClose = () => setIsModalOpen(false);

    return (
        <>
            <Modal dialogClassName="birthday-modal" onHide={handleClose} show={isModalOpen}>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {t('TEXT_WORD_BIRTHDAYS_TODAY' as any)}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="first">
                        <ul>
                            {todaysBirthdays.map((name, index) => (
                                <li key={'birthday-name-' + index}>{name}</li>
                            ))}
                        </ul>
                    </Modal.Body>
                    <Modal.Body>
                        {t('TEXT_WORD_HAPPY_BIRTHDAY' as any)}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleClose}>{t('TEXT_WORD_CLOSE' as any)}</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>

            <h3 className="mt-5">{t('TEXT_WORD_BIRTHDAYS' as any)}</h3>
            <ul className="list-group list-group-numbered">
                {Object.entries(data).map(([date, birthdays]) => (
                    <li key={'birthday-' + date}
                        className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{convertToGermanFormatFromDate(date)}</div>
                            {birthdays.map(birthday => birthday.name).join(', ')}
                        </div>
                        <span className="badge bg-primary rounded-pill">{birthdays.length}</span>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Birthdays;
