import React, { useState } from 'react';
import Select, { components, type MultiValue, type OptionProps } from "react-select";
import { GENRES } from "../../constants/constants";
import type { MovieInfo } from "../../types/movie";
import styles from './MovieForm.module.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { selectStyles } from './MovieForm.utils';

interface MovieFormProps {
  initialMovie?: MovieInfo;
  onSubmit: (movie: MovieInfo) => void;
}

export type GenreOption = {
  value: string;
  label: string;
};

const MovieForm: React.FC<MovieFormProps> = ({ initialMovie, onSubmit }) => {
  const [releaseYear, setReleaseYear] = useState<Date | null>(
    initialMovie ? new Date(initialMovie.year, 0) : null
  );

  const [selectedGenres, setSelectedGenres] = useState(
    initialMovie?.genres?.map((g) => ({ value: g, label: g })) || []
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const rawData = Object.fromEntries(formData.entries());

    if (!releaseYear) {
      alert("Please select release year");
      return;
    }

    if (selectedGenres.length === 0) {
      alert("Please select at least one genre");
      return;
    }

    const movieData: MovieInfo = {
      name: rawData.title as string,
      year: releaseYear ? releaseYear.getFullYear() : new Date().getFullYear(),
      genres: selectedGenres.map((g) => g.value),
      imageUrl: rawData.movieUrl as string,
      rating: Number(rawData.rating),
      duration: rawData.runtime as string,
      description: rawData.description as string,
    };

    onSubmit(movieData);
  };

  const Option = (props: OptionProps<GenreOption, true>) => (
    <components.Option {...props}>
      <input
        type="checkbox"
        checked={props.isSelected}
        onChange={() => null}
        style={{ marginRight: "8px", accentColor: "#f65261", }}
      />
      {props.label}
    </components.Option>
  );

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      data-testid="movie-form"
    >
      <label className={styles.label}>
        TITLE
        <input
          type="text"
          name="title"
          defaultValue={initialMovie?.name || ""}
          placeholder="Movie title"
          className={styles.input}
          required
        />
      </label>

      <label className={styles.label}>
        RELEASE YEAR
        <DatePicker
          selected={releaseYear}
          onChange={(date) => setReleaseYear(date)}
          showYearPicker
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={15}
          dateFormat="yyyy"
          placeholderText="Select year"
          className={styles.input}
          onKeyDown={(e) => e.preventDefault()}
        />
      </label>

      <label className={styles.label}>
        MOVIE URL
        <input
          type="url"
          name="movieUrl"
          defaultValue={initialMovie?.imageUrl || ""}
          placeholder="https://"
          className={styles.input}
          required
        />
      </label>

      <label className={styles.label}>
        RATING
        <input
          type="number"
          name="rating"
          step="0.1"
          defaultValue={initialMovie?.rating || ""}
          placeholder="7.8"
          className={styles.input}
          required
        />
      </label>

      <label className={styles.label}>
        GENRE
        <Select<GenreOption, true>
          options={GENRES.map((g) => ({ value: g, label: g }))}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{ Option, IndicatorSeparator: () => null }}
          value={selectedGenres}
          onChange={(selected: MultiValue<GenreOption>) =>
            setSelectedGenres(selected as GenreOption[])
          }
          placeholder="Select genres"
          className={styles.select}
          styles={selectStyles}
        />
      </label>

      <label className={styles.label}>
        RUNTIME
        <input
          type="number"
          name="runtime"
          defaultValue={initialMovie?.duration || ""}
          placeholder="minutes"
          className={styles.input}
          required
        />
      </label>

      <label className={styles.overviewLabel}>
        OVERVIEW
        <textarea
          name="description"
          defaultValue={initialMovie?.description || ""}
          placeholder="Movie description"
          className={styles.overview}
          required
        />
      </label>

      <div className={styles.actions}>
        <button
          type="reset"
          className={styles.reset}
          onClick={() => {
            setSelectedGenres([]);
            setReleaseYear(null);
          }}
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