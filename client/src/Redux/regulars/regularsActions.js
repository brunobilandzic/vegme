import { getPaginatedRegulars } from "../../Shared/Api/regular";
import { IS_LOADING, LOAD_PAGINATED_REGULARS, NOT_LOADING, UPDATE_TOTAL_ITEMS, UPDATE_TOTAL_PAGES } from "../types";

export const loadAllRegulars =  (pageNumber = 1, pageSize = 5) => async (dispatch, getState) => {
    if(getState().regulars.items[pageNumber + "-" + pageSize]) return
    dispatch({
        type: IS_LOADING,
      });
      const paginatedRegulars = await getPaginatedRegulars(
        pageNumber,
        pageSize
      );
      dispatch({
        type: LOAD_PAGINATED_REGULARS,
        payload: {
          pageNumber,
          pageSize,
          items: paginatedRegulars.items,
        },
      });
      dispatch({
        type: UPDATE_TOTAL_ITEMS,
        payload: { type: "regulars", totalItems: paginatedRegulars.totalItems },
      });
      dispatch({
        type: UPDATE_TOTAL_PAGES,
        payload: { type: "regulars", totalPages: paginatedRegulars.totalPages },
      });
      dispatch({
        type: NOT_LOADING,
      });
}