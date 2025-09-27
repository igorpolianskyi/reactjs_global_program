import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MovieForm  from "./MovieForm";
import type { MovieInfo } from "../../types/movie";

describe("MovieForm", () => {
  const initialMovie: MovieInfo = {
    id: 12345,
    name: "Inception",
    year: 2010,
    genres: ["Action", "Sci-Fi"],
    imageUrl: "https://example.com/inception.jpg",
    rating: 8.8,
    duration: "148",
    description: "A thief who steals corporate secrets through dream-sharing technology.",
  };

  it("renders empty form when no initialMovie", () => {
    const onSubmitMock = jest.fn();
    render(<MovieForm onSubmit={onSubmitMock} />);

    expect(screen.getByPlaceholderText("Movie title")).toHaveValue("");
    expect(screen.getByPlaceholderText("https://")).toHaveValue("");
    expect(screen.getByPlaceholderText("Movie description")).toHaveValue("");
  });

  it("renders prefilled form when initialMovie is provided", () => {
    const onSubmitMock = jest.fn();
    render(<MovieForm initialMovie={initialMovie} onSubmit={onSubmitMock} />);

    expect(screen.getByDisplayValue(initialMovie.name)).toBeInTheDocument();
    expect(screen.getByDisplayValue(initialMovie.imageUrl)).toBeInTheDocument();
    expect(screen.getByDisplayValue(initialMovie.rating.toString())).toBeInTheDocument();
    expect(screen.getByDisplayValue(initialMovie.duration)).toBeInTheDocument();
    expect(screen.getByDisplayValue(initialMovie.description)).toBeInTheDocument();
  });

  it("updates input fields when user types", async () => {
    const onSubmitMock = jest.fn();
    render(<MovieForm onSubmit={onSubmitMock} />);

    const user = userEvent.setup();

    const titleInput = screen.getByPlaceholderText("Movie title") as HTMLInputElement;
    await user.clear(titleInput);
    await user.type(titleInput, "Interstellar");
    expect(titleInput.value).toBe("Interstellar");

    const descriptionInput = screen.getByPlaceholderText("Movie description") as HTMLTextAreaElement;
    await user.clear(descriptionInput);
    await user.type(descriptionInput, "Space exploration movie");
    expect(descriptionInput.value).toBe("Space exploration movie");
  });

  it("calls onSubmit with correct data", async () => {
    const onSubmitMock = jest.fn();
    render(<MovieForm initialMovie={initialMovie} onSubmit={onSubmitMock} />);

    const user = userEvent.setup();

    const titleInput = screen.getByPlaceholderText("Movie title") as HTMLInputElement;
    await user.clear(titleInput);
    await user.type(titleInput, "Interstellar");

    const submitButton = screen.getByText("SUBMIT");
    await user.click(submitButton);

    expect(onSubmitMock).toHaveBeenCalledTimes(1);

    const submittedData: MovieFormValues = onSubmitMock.mock.calls[0][0];
    expect(submittedData.title).toBe("Interstellar");
    expect(submittedData.releaseYear?.getFullYear()).toBe(initialMovie.year);
    expect(submittedData.movieUrl).toBe(initialMovie.imageUrl);
    expect(submittedData.rating).toBe(initialMovie.rating);
    expect(submittedData.genres.map(g => g.value)).toEqual(initialMovie.genres);
    expect(submittedData.runtime).toBe(Number(initialMovie.duration));
    expect(submittedData.description).toBe(initialMovie.description);
  });

  it("resets form fields when RESET button is clicked", async () => {
    const onSubmitMock = jest.fn();
    render(<MovieForm initialMovie={initialMovie} onSubmit={onSubmitMock} />);

    const user = userEvent.setup();
    const resetButton = screen.getByText("RESET");

    await user.click(resetButton);

    expect(screen.getByPlaceholderText("Movie title")).toHaveValue("");
    expect(screen.getByPlaceholderText("https://")).toHaveValue("");
    expect(screen.getByPlaceholderText("Movie description")).toHaveValue("");
  });

  it("does not submit when required fields are empty and shows validation errors", async () => {
    const onSubmitMock = jest.fn();
    render(<MovieForm onSubmit={onSubmitMock} />);

    const user = userEvent.setup();
    const submitButton = screen.getByText("SUBMIT");

    await user.click(submitButton);

    expect(onSubmitMock).not.toHaveBeenCalled();
    expect(await screen.findByText("Title is required")).toBeInTheDocument();
    expect(await screen.findByText("Select release year")).toBeInTheDocument();
    expect(await screen.findByText("Movie URL is required")).toBeInTheDocument();
    expect(await screen.findByText("Description is required")).toBeInTheDocument();
  });

  it("validates genre selection", async () => {
    const onSubmitMock = jest.fn();
    render(<MovieForm onSubmit={onSubmitMock} />);

    const user = userEvent.setup();
    const submitButton = screen.getByText("SUBMIT");

    await user.click(submitButton);
    expect(await screen.findByText("Select at least one genre")).toBeInTheDocument();
  });
});