import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { addReviewAction } from '../../store/api-actions';
import { MAX_REVIEW_LENGTH, MIN_REVIEW_LENGTH } from '../../const';
import { getIsReviewPosting } from '../../store/data-process/selectors';

type ReviewFormProps = {
  offerId: string;
}

function ReviewForm({offerId}: ReviewFormProps){
  const dispatch = useAppDispatch();
  const isPosting = useAppSelector(getIsReviewPosting);

  const [formData, setFormData] = useState({
    rating: 0,
    comment: ''
  });

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      rating: parseInt(event.target.value, 10)
    });
  };

  const handleReviewChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      comment: event.target.value
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addReviewAction({...formData, offerId}))
      .unwrap()
      .then(() => {
        setFormData({
          rating: 0,
          comment: ''
        });
      })
      .catch(() => {});
  };

  const isFormValid = formData.rating !== 0 && formData.comment.length >= MIN_REVIEW_LENGTH && formData.comment.length <= MAX_REVIEW_LENGTH;

  const ratings = [
    { value: 5, title: 'perfect' },
    { value: 4, title: 'good' },
    { value: 3, title: 'not bad' },
    { value: 2, title: 'badly' },
    { value: 1, title: 'terribly' }
  ];

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        {ratings.map(({ value, title }) => [
          <input
            key={`input-${value}`}
            className="form__rating-input visually-hidden"
            name="rating"
            value={value}
            id={`${value}-stars`}
            type="radio"
            checked={formData.rating === value}
            onChange={handleRatingChange}
          />,
          <label
            key={`label-${value}`}
            htmlFor={`${value}-stars`}
            className="reviews__rating-label form__rating-label"
            title={title}
          >
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        ])}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.comment}
        onChange={handleReviewChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay with at least{' '}
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isPosting || !isFormValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
