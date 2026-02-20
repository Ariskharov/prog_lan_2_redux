import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFurnitureApi, fetchFurnitureByIdApi } from "../../api/furnitureApi";

// 📃 Загрузка списка мебели
export const fetchFurniture = createAsyncThunk(
    "furniture/fetchAll",
    async () => {
        return await fetchFurnitureApi();
    }
);

// 🔍 Загрузка одного предмета
export const fetchFurnitureById = createAsyncThunk(
    "furniture/fetchById",
    async (id) => {
        return await fetchFurnitureByIdApi(id);
    }
);

const furnitureSlice = createSlice({
    name: "furniture",
    initialState: {
        items: [],
        selectedItem: null,
        status: "idle",
        error: null
    },
    reducers: {
        clearSelectedItem(state) {
            state.selectedItem = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // список
            .addCase(fetchFurniture.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchFurniture.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchFurniture.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })

            // один предмет
            .addCase(fetchFurnitureById.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchFurnitureById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.selectedItem = action.payload;
            })
            .addCase(fetchFurnitureById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    }
});

export const { clearSelectedItem } = furnitureSlice.actions;
export default furnitureSlice.reducer;
