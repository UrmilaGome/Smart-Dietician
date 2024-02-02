import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const localDietPlan = localStorage.getItem("diet");

const initialState = {
  diet: localDietPlan ? JSON.parse(localDietPlan) : "",
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const dietSlice = createSlice({
  name: "diet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDiet.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDiet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.diet = action.payload;
      })
      .addCase(createDiet.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const createDiet = createAsyncThunk(
  "fetch/diet",
  async (prompt, thunkAPI) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 1000,
      }),
    };

    try {
      const response = await fetch(
        "https://api.openai.com/v1/completions",
        options
      );
      const json = await response.json();
      console.log(json.choices);
      const dietPlan = json.choices[0];
      localStorage.setItem("diet", JSON.stringify(dietPlan));
      return dietPlan;
    } catch (error) {
      const message = error;
      thunkAPI.rejectWithValue(message);
    }
  }
);

export default dietSlice.reducer;
