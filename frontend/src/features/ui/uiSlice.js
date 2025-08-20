import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: { type: 'sale', minPrice: '', maxPrice: '', bedrooms: '', bathrooms: '', minArea: '', maxArea: '', amenities: '', location: '', sort: 'newest' },
  page: 1,
  limit: 12
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setFilters(state, action) { state.filters = { ...state.filters, ...action.payload }; state.page = 1; },
    setPage(state, action) { state.page = action.payload; },
    resetFilters() { return initialState; }
  }
});

export const { setFilters, setPage, resetFilters } = uiSlice.actions;
export default uiSlice.reducer;
