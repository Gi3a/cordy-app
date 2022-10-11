import React from "react";

import styles from "./Feedback.module.scss";

const FeedbackItem = ({ id, user_id, date, text, name, avatar, rating }) => {
    return (
        <div className={styles.feedback_item}>
            {rating}
        </div>
    )
}

export default FeedbackItem