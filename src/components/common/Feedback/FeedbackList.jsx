import React from "react";
import styles from "./Feedback.module.scss";
import FeedbackItem from "./FeedbackItem";

const FeedbackList = ({ feedbacks }) => {
    return (
        <div className={styles.feedback_list}>
            {feedbacks?.length > 0 ?
                <>
                    <h1>Отзывы</h1>
                    {feedbacks.map(({ id, user_id, date, text, name, avatar, rating }) => {
                        return (
                            <FeedbackItem
                                key={id}
                                id={id}
                                user_id={user_id}
                                date={date}
                                text={text}
                                name={name}
                                avatar={avatar}
                                rating={rating}
                            />
                        );
                    })}
                </>
                :
                <h2>Нет отзывов</h2>
            }
        </div>
    )
}

export default FeedbackList