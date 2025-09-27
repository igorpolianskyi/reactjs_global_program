import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select, { components, type GroupBase, type MultiValue, type OptionProps } from "react-select";
import DatePicker from "react-datepicker";
import { GENRES } from "../../constants/constants";
import type { MovieInfo } from "../../types/movie";
import styles from "./MovieForm.module.css";
import { selectStyles } from './MovieForm.utils';
import "react-datepicker/dist/react-datepicker.css";

export type GenreOption = { value: string; label: string };

interface MovieFormProps {
  initialMovie?: MovieInfo;
  onSubmit: (movie: MovieFormValues) => void;
}

export type MovieFormValues = {
  title: string;
  releaseYear: Date | null;
  movieUrl: string;
  rating: number;
  genres: GenreOption[];
  runtime: number;
  description: string;
  tagline?: string;
  budget?: number;
  revenue?: number;
};

const MovieForm: React.FC<MovieFormProps> = ({ initialMovie, onSubmit }) => {
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<MovieFormValues>({
    defaultValues: {
      title: initialMovie?.name || "",
      releaseYear: initialMovie ? new Date(initialMovie.year, 0) : null,
      movieUrl: initialMovie?.imageUrl || "",
      rating: initialMovie?.rating || 0,
      genres: initialMovie?.genres.map(g => ({ value: g, label: g })) || [],
      runtime: initialMovie?.duration
        ? Number(initialMovie.duration.replace(/\D/g, ""))
        : 0,
      description: initialMovie?.description || "",
    },
  });

  const Option = (props: OptionProps<GenreOption, true, GroupBase<GenreOption>>) => (
    <components.Option {...props}>
      <input
        type="checkbox"
        checked={props.isSelected}
        onChange={() => null}
        style={{ marginRight: "8px", accentColor: "#f65261" }}
      />
      {props.label}
    </components.Option>
  );

  const handleReset = () => {
    reset({
      title: "",
      releaseYear: null,
      movieUrl: "",
      rating: 0,
      genres: [],
      runtime: 0,
      description: "",
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} data-testid="movie-form">
      <label className={styles.label}>
        TITLE
        <input
          placeholder="Movie title"
          className={styles.input}
          {...register("title", {
            required: "Title is required",
            minLength: { value: 2, message: "Title must be at least 2 characters" },
            maxLength: { value: 50, message: "Title must be at most 50 characters" },
            pattern: { value: /^[A-Za-z0-9 ]+$/, message: "Title must contain only English letters and numbers" }
          })}
        />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}
      </label>

      <label className={styles.label}>
        RELEASE YEAR
        <Controller
          name="releaseYear"
          control={control}
          rules={{ required: "Select release year" }}
          render={({ field }) => (
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              showYearPicker
              dateFormat="yyyy"
              placeholderText="Select year"
              className={styles.input}
              customInput={<input className={styles.input} />}
            />
          )}
        />
        {errors.releaseYear && <p className={styles.error}>{errors.releaseYear.message}</p>}
      </label>

      <label className={styles.label}>
        MOVIE URL
        <input
          placeholder="https://"
          className={styles.input}
          {...register("movieUrl", {
            required: "Movie URL is required",
            pattern: { value: /^https?:\/\/.+$/, message: "Enter a valid URL" }
          })}
        />
        {errors.movieUrl && <p className={styles.error}>{errors.movieUrl.message}</p>}
      </label>

      <label className={styles.label}>
        RATING
        <input
          type="number"
          step="0.1"
          placeholder="7.8"
          className={styles.input}
          {...register("rating", {
            required: "Rating is required",
            min: { value: 0, message: "Rating must be at least 0" },
            max: { value: 10, message: "Rating must be at most 10" }
          })}
        />
        {errors.rating && <p className={styles.error}>{errors.rating.message}</p>}
      </label>

      <label className={styles.label}>
        GENRE
        <Controller
          name="genres"
          control={control}
          rules={{ validate: v => (v && v.length > 0) || "Select at least one genre" }}
          render={({ field }) => (
            <Select<GenreOption, true, GroupBase<GenreOption>>
              {...field}
              isMulti
              options={GENRES.map(g => ({ value: g, label: g }))}
              value={field.value}
              onChange={(val: MultiValue<GenreOption>) => field.onChange(val)}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              className={styles.select}
              classNamePrefix="movie-select"
              components={{ Option, IndicatorSeparator: () => null }}
              styles={selectStyles} // об’єкт StylesConfig
            />
          )}
        />
        {errors.genres && <p className={styles.error}>{errors.genres.message}</p>}
      </label>

      <label className={styles.label}>
        RUNTIME
        <input
          type="number"
          placeholder="minutes"
          className={styles.input}
          {...register("runtime", { required: "Runtime is required", min: { value: 1, message: "Runtime must be at least 1 minute" } })}
        />
        {errors.runtime && <p className={styles.error}>{errors.runtime.message}</p>}
      </label>

      <label className={styles.overviewLabel}>
        OVERVIEW
        <textarea
          placeholder="Movie description"
          className={styles.overview}
          {...register("description", { required: "Description is required", minLength: { value: 10, message: "Description must be at least 10 characters" } })}
        />
        {errors.description && <p className={styles.error}>{errors.description.message}</p>}
      </label>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.reset}
          onClick={handleReset}
        >
          RESET
        </button>

        <button type="submit" className={styles.submit}>
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default MovieForm;